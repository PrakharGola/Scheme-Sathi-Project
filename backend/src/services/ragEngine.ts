import { prisma } from "../config/db";
import { sampleSchemes } from "../data/sampleSchemes";
import { detectLanguageFromText } from "./languageDetector";

type ChatLanguage =
  | "en"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "gu"
  | "pa"
  | "ur";

interface ChatScheme {
  id: string;
  slug?: string;
  name: string;
  description: string;
  benefits: string;
  documents: string[];
  eligibility: string;
  category: string;
}

const supportedLanguages = new Set([
  "en",
  "hi",
  "mr",
  "bn",
  "ta",
  "te",
  "kn",
  "ml",
  "gu",
  "pa",
  "ur"
]);

const responseCopy: Record<
  ChatLanguage,
  {
    intro: string;
    benefit: string;
    documents: string;
    closing: string;
    noDocs: string;
  }
> = {
  en: {
    intro: "These schemes may be relevant based on your question:",
    benefit: "Benefit",
    documents: "Documents",
    closing: "For an exact match, fill the Eligibility Checker.",
    noDocs: "No document list available"
  },
  hi: {
    intro: "आपके प्रश्न के आधार पर ये योजनाएं उपयोगी हो सकती हैं:",
    benefit: "लाभ",
    documents: "दस्तावेज",
    closing: "सटीक मिलान के लिए पात्रता जांच फॉर्म भरें।",
    noDocs: "दस्तावेज सूची उपलब्ध नहीं है"
  },
  mr: {
    intro: "तुमच्या प्रश्नानुसार या योजना उपयुक्त ठरू शकतात:",
    benefit: "लाभ",
    documents: "कागदपत्रे",
    closing: "अचूक जुळणीसाठी पात्रता तपासणी भरा.",
    noDocs: "कागदपत्रांची यादी उपलब्ध नाही"
  },
  bn: {
    intro: "আপনার প্রশ্নের ভিত্তিতে এই প্রকল্পগুলি প্রাসঙ্গিক হতে পারে:",
    benefit: "সুবিধা",
    documents: "নথি",
    closing: "সঠিক মিল পেতে যোগ্যতা যাচাই ফর্ম পূরণ করুন।",
    noDocs: "নথির তালিকা উপলব্ধ নেই"
  },
  ta: {
    intro: "உங்கள் கேள்வியின் அடிப்படையில் இந்த திட்டங்கள் பொருத்தமாக இருக்கலாம்:",
    benefit: "நன்மை",
    documents: "ஆவணங்கள்",
    closing: "சரியான பொருத்தத்திற்காக தகுதி சரிபார்ப்பை நிரப்பவும்.",
    noDocs: "ஆவண பட்டியல் இல்லை"
  },
  te: {
    intro: "మీ ప్రశ్న ఆధారంగా ఈ పథకాలు ఉపయోగకరంగా ఉండవచ్చు:",
    benefit: "ప్రయోజనం",
    documents: "పత్రాలు",
    closing: "ఖచ్చితమైన సరిపోలిక కోసం అర్హత తనిఖీ ఫారమ్ నింపండి.",
    noDocs: "పత్రాల జాబితా అందుబాటులో లేదు"
  },
  kn: {
    intro: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಆಧಾರದ ಮೇಲೆ ಈ ಯೋಜನೆಗಳು ಉಪಯುಕ್ತವಾಗಿರಬಹುದು:",
    benefit: "ಲಾಭ",
    documents: "ದಾಖಲೆಗಳು",
    closing: "ನಿಖರ ಹೊಂದಾಣಿಕೆಗಾಗಿ ಅರ್ಹತಾ ಪರಿಶೀಲನೆಯನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    noDocs: "ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಲಭ್ಯವಿಲ್ಲ"
  },
  ml: {
    intro: "നിങ്ങളുടെ ചോദ്യത്തിന്റെ അടിസ്ഥാനത്തിൽ ഈ പദ്ധതികൾ പ്രസക്തമായേക്കാം:",
    benefit: "ആനുകൂല്യം",
    documents: "രേഖകൾ",
    closing: "കൃത്യമായ പൊരുത്തത്തിനായി അർഹത പരിശോധന പൂരിപ്പിക്കുക.",
    noDocs: "രേഖകളുടെ പട്ടിക ലഭ്യമല്ല"
  },
  gu: {
    intro: "તમારા પ્રશ્નના આધારે આ યોજનાઓ ઉપયોગી હોઈ શકે છે:",
    benefit: "લાભ",
    documents: "દસ્તાવેજો",
    closing: "ચોક્કસ મેળ માટે પાત્રતા તપાસ ફોર્મ भरो.",
    noDocs: "દસ્તાવેજોની યાદી ઉપલબ્ધ નથી"
  },
  pa: {
    intro: "ਤੁਹਾਡੇ ਸਵਾਲ ਦੇ ਆਧਾਰ ਤੇ ਇਹ ਯੋਜਨਾਵਾਂ ਲਾਭਕਾਰੀ ਹੋ ਸਕਦੀਆਂ ਹਨ:",
    benefit: "ਲਾਭ",
    documents: "ਦਸਤਾਵੇਜ਼",
    closing: "ਸਹੀ ਮਿਲਾਣ ਲਈ ਯੋਗਤਾ ਜਾਂਚ ਫਾਰਮ ਭਰੋ।",
    noDocs: "ਦਸਤਾਵੇਜ਼ ਸੂਚੀ ਉਪਲਬਧ ਨਹੀਂ"
  },
  ur: {
    intro: "آپ کے سوال کی بنیاد پر یہ اسکیمیں مفید ہو سکتی ہیں:",
    benefit: "فائدہ",
    documents: "دستاویزات",
    closing: "درست مماثلت کے لیے اہلیت چیکر پُر کریں۔",
    noDocs: "دستاویزات کی فہرست دستیاب نہیں"
  }
};

const localizedSchemes: Record<
  ChatLanguage,
  Record<string, { name: string; description: string; benefits: string; documents: string[] }>
> = {
  en: {},
  hi: {
    "pm-kisan": {
      name: "पीएम-किसान",
      description: "किसान परिवारों को हर साल वित्तीय सहायता देने वाली आय सहायता योजना।",
      benefits: "प्रति वर्ष रु 6000",
      documents: ["आधार", "भूमि रिकॉर्ड", "बैंक खाता विवरण"]
    },
    "ayushman-bharat-pm-jay": {
      name: "आयुष्मान भारत पीएम-जय",
      description: "पात्र कम आय वाले परिवारों के लिए अस्पताल उपचार हेतु स्वास्थ्य बीमा कवर।",
      benefits: "प्रति परिवार प्रति वर्ष रु 500000 स्वास्थ्य कवर",
      documents: ["आधार", "राशन कार्ड", "पीएम-जय कार्ड"]
    },
    "national-scholarship-portal": {
      name: "राष्ट्रीय छात्रवृत्ति पोर्टल",
      description: "पात्र विद्यार्थियों के लिए छात्रवृत्ति खोज और आवेदन मंच।",
      benefits: "प्रति वर्ष रु 10000",
      documents: ["आधार", "आय प्रमाण पत्र", "अंकपत्र"]
    }
  },
  mr: {
    "pm-kisan": {
      name: "पीएम-किसान",
      description: "शेतकरी कुटुंबांना दरवर्षी आर्थिक मदत देणारी उत्पन्न सहाय्य योजना.",
      benefits: "दरवर्षी रु 6000",
      documents: ["आधार", "जमीन नोंदी", "बँक खाते तपशील"]
    },
    "ayushman-bharat-pm-jay": {
      name: "आयुष्मान भारत पीएम-जय",
      description: "पात्र कमी उत्पन्न कुटुंबांसाठी रुग्णालय उपचारांचे आरोग्य विमा संरक्षण.",
      benefits: "कुटुंबाला दरवर्षी रु 500000 आरोग्य संरक्षण",
      documents: ["आधार", "रेशन कार्ड", "पीएम-जय कार्ड"]
    },
    "national-scholarship-portal": {
      name: "राष्ट्रीय शिष्यवृत्ती पोर्टल",
      description: "पात्र विद्यार्थ्यांसाठी शिष्यवृत्ती शोध आणि अर्ज मंच.",
      benefits: "दरवर्षी रु 10000",
      documents: ["आधार", "उत्पन्न प्रमाणपत्र", "गुणपत्रिका"]
    }
  },
  bn: {
    "pm-kisan": {
      name: "পিএম-কিসান",
      description: "কৃষক পরিবারকে প্রতি বছর আর্থিক সহায়তা দেওয়ার আয় সহায়তা প্রকল্প।",
      benefits: "প্রতি বছর টাকা 6000",
      documents: ["আধার", "জমির রেকর্ড", "ব্যাংক হিসাবের তথ্য"]
    },
    "ayushman-bharat-pm-jay": {
      name: "আয়ুষ্মান ভারত পিএম-জেএওয়াই",
      description: "যোগ্য নিম্ন আয়ের পরিবারের জন্য হাসপাতাল চিকিৎসার স্বাস্থ্য বীমা কভার।",
      benefits: "পরিবার প্রতি বছরে টাকা 500000 স্বাস্থ্য কভার",
      documents: ["আধার", "রেশন কার্ড", "পিএম-জেএওয়াই কার্ড"]
    },
    "national-scholarship-portal": {
      name: "জাতীয় বৃত্তি পোর্টাল",
      description: "যোগ্য ছাত্রছাত্রীদের জন্য বৃত্তি খোঁজা ও আবেদন করার মঞ্চ।",
      benefits: "প্রতি বছর টাকা 10000",
      documents: ["আধার", "আয়ের শংসাপত্র", "মার্কশিট"]
    }
  },
  ta: {
    "pm-kisan": {
      name: "பிஎம்-கிசான்",
      description: "விவசாயக் குடும்பங்களுக்கு ஆண்டுதோறும் நிதி உதவி வழங்கும் வருமான ஆதரவு திட்டம்.",
      benefits: "ஆண்டுக்கு ரூ 6000",
      documents: ["ஆதார்", "நில பதிவுகள்", "வங்கி கணக்கு விவரங்கள்"]
    },
    "ayushman-bharat-pm-jay": {
      name: "ஆயுஷ்மான் பாரத் பிஎம்-ஜேஏய்",
      description: "தகுதியான குறைந்த வருமான குடும்பங்களுக்கு மருத்துவமனை சிகிச்சைக்கான சுகாதார காப்பீடு.",
      benefits: "ஒரு குடும்பத்திற்கு ஆண்டுக்கு ரூ 500000 சுகாதார காப்பீடு",
      documents: ["ஆதார்", "ரேஷன் கார்டு", "பிஎம்-ஜேஏய் கார்டு"]
    },
    "national-scholarship-portal": {
      name: "தேசிய கல்வி உதவித்தொகை போர்டல்",
      description: "தகுதியான மாணவர்களுக்கு உதவித்தொகை தேடல் மற்றும் விண்ணப்பிக்கும் தளம்.",
      benefits: "ஆண்டுக்கு ரூ 10000",
      documents: ["ஆதார்", "வருமானச் சான்று", "மதிப்பெண் பட்டியல்"]
    }
  },
  te: {
    "pm-kisan": {
      name: "పీఎం-కిసాన్",
      description: "రైతు కుటుంబాలకు ప్రతి సంవత్సరం ఆర్థిక సహాయం అందించే ఆదాయ సహాయ పథకం.",
      benefits: "ప్రతి సంవత్సరం రూ 6000",
      documents: ["ఆధార్", "భూమి రికార్డులు", "బ్యాంకు ఖాతా వివరాలు"]
    },
    "ayushman-bharat-pm-jay": {
      name: "ఆయుష్మాన్ భారత్ పీఎం-జేఏవై",
      description: "అర్హులైన తక్కువ ఆదాయ కుటుంబాలకు ఆసుపత్రి చికిత్స కోసం ఆరోగ్య బీమా కవరేజ్.",
      benefits: "కుటుంబానికి ప్రతి సంవత్సరం రూ 500000 ఆరోగ్య కవరేజ్",
      documents: ["ఆధార్", "రేషన్ కార్డు", "పీఎం-జేఏవై కార్డు"]
    },
    "national-scholarship-portal": {
      name: "జాతీయ స్కాలర్‌షిప్ పోర్టల్",
      description: "అర్హులైన విద్యార్థుల కోసం స్కాలర్‌షిప్ శోధన మరియు దరఖాస్తు వేదిక.",
      benefits: "ప్రతి సంవత్సరం రూ 10000",
      documents: ["ఆధార్", "ఆదాయ ధృవీకరణ పత్రం", "మార్కుల జాబితా"]
    }
  },
  kn: {},
  ml: {},
  gu: {},
  pa: {},
  ur: {}
};

export async function chatWithSchemes(params: {
  message: string;
  language?: string;
  userId?: string;
}) {
  const lang = normalizeLanguage(params.language || detectLanguageFromText(params.message, "en"));

  const schemes = await prisma.scheme.findMany({
    take: 3,
    orderBy: { name: "asc" }
  }).catch(() => sampleSchemes.slice(0, 3));

  const selectedSchemes = filterSchemes(params.message, schemes);
  const sources = selectedSchemes.map((scheme) => ({
    schemeId: scheme.id,
    name: localizeScheme(lang, scheme).name
  }));
  const reply = buildReply(lang, selectedSchemes);

  const conversation = await prisma.conversation.create({
    data: {
      userId: params.userId || null,
      language: lang,
      messages: [
        { role: "user", content: params.message },
        { role: "assistant", content: reply, sources }
      ] as any
    }
  }).catch(() => null);

  return {
    reply,
    language: lang,
    sources,
    conversationId: conversation?.id || "local-demo"
  };
}

function normalizeLanguage(language: string): ChatLanguage {
  return supportedLanguages.has(language) ? (language as ChatLanguage) : "en";
}

function filterSchemes(message: string, schemes: ChatScheme[]) {
  const lower = message.toLowerCase();
  const isFarmerQuestion =
    lower.includes("farmer") ||
    lower.includes("kisan") ||
    lower.includes("kisaan") ||
    lower.includes("किसान");
  const isStudentQuestion =
    lower.includes("student") ||
    lower.includes("scholarship") ||
    lower.includes("education");
  const isHealthQuestion =
    lower.includes("health") ||
    lower.includes("hospital") ||
    lower.includes("insurance");

  const relevantSchemes = schemes.filter((scheme) => {
    const text = `${scheme.name} ${scheme.description} ${scheme.eligibility} ${scheme.category}`.toLowerCase();
    if (isFarmerQuestion) return text.includes("farmer") || text.includes("agriculture");
    if (isStudentQuestion) return text.includes("student") || text.includes("education");
    if (isHealthQuestion) return text.includes("health") || text.includes("hospital");
    return true;
  });

  return relevantSchemes.length ? relevantSchemes : schemes;
}

function buildReply(lang: ChatLanguage, schemes: ChatScheme[]): string {
  const copy = responseCopy[lang];
  const lines = schemes.map((scheme) => {
    const localized = localizeScheme(lang, scheme);
    const docs = localized.documents.slice(0, 3).join(", ") || copy.noDocs;
    return `- ${localized.name}: ${localized.description} ${copy.benefit}: ${localized.benefits}. ${copy.documents}: ${docs}.`;
  });

  return [copy.intro, ...lines, copy.closing].join("\n");
}

function localizeScheme(lang: ChatLanguage, scheme: ChatScheme) {
  const localized = scheme.slug ? localizedSchemes[lang][scheme.slug] : undefined;
  return {
    name: localized?.name || scheme.name,
    description: localized?.description || scheme.description,
    benefits: localized?.benefits || scheme.benefits,
    documents: localized?.documents || scheme.documents
  };
}
