import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppLanguage =
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

export const languageOptions: { code: AppLanguage; label: string; nativeName: string }[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", label: "Marathi", nativeName: "मराठी" },
  { code: "bn", label: "Bengali", nativeName: "বাংলা" },
  { code: "ta", label: "Tamil", nativeName: "தமிழ்" },
  { code: "te", label: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeName: "മലയാളം" },
  { code: "gu", label: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "Urdu", nativeName: "اردو" }
];

type TranslationKey =
  | "brandTagline"
  | "language"
  | "navHome"
  | "navChat"
  | "navEligibility"
  | "navSchemes"
  | "navImpact"
  | "footerCopyright"
  | "footerBuilt"
  | "homeEyebrow"
  | "homeTitle"
  | "homeBody"
  | "homeStartChat"
  | "homeCheckEligibility"
  | "homeMetricSchemes"
  | "homeMetricSchemesValue"
  | "homeMetricFlows"
  | "homeMetricFlowsValue"
  | "homeMetricFallback"
  | "homeMetricFallbackValue"
  | "homeFeatureDiscovery"
  | "homeFeatureDiscoveryBody"
  | "homeFeatureEligibility"
  | "homeFeatureEligibilityBody"
  | "homeFeatureChat"
  | "homeFeatureChatBody"
  | "chatMode"
  | "chatTitle"
  | "chatPrompt1"
  | "chatPrompt2"
  | "chatPrompt3"
  | "chatConversation"
  | "chatSourcesHint"
  | "chatGreeting"
  | "chatError"
  | "chatThinking"
  | "chatPlaceholder"
  | "chatSend"
  | "schemesEyebrow"
  | "schemesTitle"
  | "schemesVisible"
  | "schemesSearch"
  | "schemesAllCategories"
  | "schemesAllStates"
  | "schemesLoading"
  | "schemesError"
  | "schemesBenefit"
  | "schemesOfficialLink"
  | "schemesNoMatch"
  | "eligibilityEyebrow"
  | "eligibilityTitle"
  | "eligibilityAge"
  | "eligibilityGender"
  | "eligibilityMale"
  | "eligibilityFemale"
  | "eligibilityOther"
  | "eligibilityState"
  | "eligibilityOccupation"
  | "eligibilityIncome"
  | "eligibilityFamilySize"
  | "eligibilityMaritalStatus"
  | "eligibilityFarmer"
  | "eligibilityStudent"
  | "eligibilityDisability"
  | "eligibilityCheck"
  | "eligibilityChecking"
  | "eligibilityReset"
  | "eligibilityError"
  | "eligibilityEmpty"
  | "eligibilityMatches"
  | "eligibilityPotential"
  | "eligibilityResponse"
  | "eligibilityPriority"
  | "impactEyebrow"
  | "impactTitle"
  | "impactHouseholds"
  | "impactCurrentAwareness"
  | "impactPostAwareness"
  | "impactAverageBenefit"
  | "impactAdditionalBeneficiaries"
  | "impactEstimatedImpact"
  | "commonRs";

const en: Record<TranslationKey, string> = {
  brandTagline: "Welfare access assistant",
  language: "Language",
  navHome: "Home",
  navChat: "Chat",
  navEligibility: "Eligibility",
  navSchemes: "Schemes",
  navImpact: "Impact",
  footerCopyright: "Copyright",
  footerBuilt: "Built for NSS Open Projects 2026",
  homeEyebrow: "SchemeSathi",
  homeTitle: "Find welfare schemes you can actually use",
  homeBody: "Ask questions, check eligibility, compare benefits, and prepare document checklists for public welfare schemes.",
  homeStartChat: "Start Chat",
  homeCheckEligibility: "Check Eligibility",
  homeMetricSchemes: "Demo schemes loaded",
  homeMetricSchemesValue: "3",
  homeMetricFlows: "Supported flows",
  homeMetricFlowsValue: "Chat, schemes, eligibility",
  homeMetricFallback: "Local fallback",
  homeMetricFallbackValue: "Works without PostgreSQL",
  homeFeatureDiscovery: "Scheme discovery",
  homeFeatureDiscoveryBody: "Search by category, state, or keyword.",
  homeFeatureEligibility: "Eligibility scoring",
  homeFeatureEligibilityBody: "View reasons, documents, and likely benefits.",
  homeFeatureChat: "Guided chat",
  homeFeatureChatBody: "Ask natural questions about schemes and documents.",
  chatMode: "Assistant mode",
  chatTitle: "Scheme chat",
  chatPrompt1: "I am a farmer in UP. Which schemes should I check?",
  chatPrompt2: "What documents are needed for health insurance schemes?",
  chatPrompt3: "Which schemes are useful for students?",
  chatConversation: "Conversation",
  chatSourcesHint: "Sources appear under each answer.",
  chatGreeting: "Hello. Ask me about welfare schemes, documents, benefits, or eligibility.",
  chatError: "I could not reach the SchemeSathi API. Check that the backend is running on port 4000.",
  chatThinking: "SchemeSathi is checking schemes...",
  chatPlaceholder: "Ask about schemes, eligibility, documents...",
  chatSend: "Send",
  schemesEyebrow: "Scheme explorer",
  schemesTitle: "Supported schemes",
  schemesVisible: "visible",
  schemesSearch: "Search scheme or eligibility",
  schemesAllCategories: "All categories",
  schemesAllStates: "All states",
  schemesLoading: "Loading schemes...",
  schemesError: "Could not load schemes. Make sure the backend is running on port 4000.",
  schemesBenefit: "Benefit",
  schemesOfficialLink: "Official link",
  schemesNoMatch: "No schemes match the current filters.",
  eligibilityEyebrow: "Eligibility checker",
  eligibilityTitle: "Match citizen profile to schemes",
  eligibilityAge: "Age",
  eligibilityGender: "Gender",
  eligibilityMale: "Male",
  eligibilityFemale: "Female",
  eligibilityOther: "Other",
  eligibilityState: "State",
  eligibilityOccupation: "Occupation",
  eligibilityIncome: "Annual income",
  eligibilityFamilySize: "Family size",
  eligibilityMaritalStatus: "Marital status",
  eligibilityFarmer: "Farmer household",
  eligibilityStudent: "Student beneficiary",
  eligibilityDisability: "Disability support needed",
  eligibilityCheck: "Check Eligibility",
  eligibilityChecking: "Checking...",
  eligibilityReset: "Reset",
  eligibilityError: "Could not check eligibility. Make sure the backend is running on port 4000.",
  eligibilityEmpty: "Results will appear here after the profile is checked.",
  eligibilityMatches: "Matches",
  eligibilityPotential: "Potential annual benefit",
  eligibilityResponse: "Response",
  eligibilityPriority: "Priority score",
  impactEyebrow: "Impact calculator",
  impactTitle: "Estimate adoption impact",
  impactHouseholds: "District households",
  impactCurrentAwareness: "Current awareness (%)",
  impactPostAwareness: "Awareness after SchemeSathi (%)",
  impactAverageBenefit: "Average benefit per beneficiary (Rs/year)",
  impactAdditionalBeneficiaries: "Additional beneficiaries",
  impactEstimatedImpact: "Estimated yearly impact",
  commonRs: "Rs"
};

const localized: Record<AppLanguage, Partial<Record<TranslationKey, string>>> = {
  en,
  hi: {
    brandTagline: "कल्याण योजना सहायक",
    language: "भाषा",
    navHome: "होम",
    navChat: "चैट",
    navEligibility: "पात्रता",
    navSchemes: "योजनाएं",
    navImpact: "प्रभाव",
    footerBuilt: "NSS Open Projects 2026 के लिए बनाया गया",
    homeTitle: "अपने लिए उपयोगी सरकारी योजनाएं खोजें",
    homeBody: "प्रश्न पूछें, पात्रता जांचें, लाभों की तुलना करें और दस्तावेजों की सूची तैयार करें।",
    homeStartChat: "चैट शुरू करें",
    homeCheckEligibility: "पात्रता जांचें",
    chatTitle: "योजना चैट",
    chatGreeting: "नमस्ते। योजनाओं, दस्तावेजों, लाभों या पात्रता के बारे में पूछें।",
    chatSend: "भेजें",
    schemesTitle: "उपलब्ध योजनाएं",
    eligibilityTitle: "नागरिक प्रोफाइल को योजनाओं से मिलाएं",
    eligibilityCheck: "पात्रता जांचें",
    impactTitle: "स्वीकार्यता प्रभाव का अनुमान लगाएं",
    commonRs: "रु"
  },
  mr: {
    brandTagline: "कल्याण योजना सहाय्यक",
    language: "भाषा",
    navHome: "मुख्यपृष्ठ",
    navChat: "चॅट",
    navEligibility: "पात्रता",
    navSchemes: "योजना",
    navImpact: "परिणाम",
    homeTitle: "तुमच्यासाठी उपयुक्त सरकारी योजना शोधा",
    homeBody: "प्रश्न विचारा, पात्रता तपासा, लाभांची तुलना करा आणि कागदपत्रांची यादी तयार करा.",
    homeStartChat: "चॅट सुरू करा",
    homeCheckEligibility: "पात्रता तपासा",
    chatTitle: "योजना चॅट",
    chatSend: "पाठवा",
    schemesTitle: "उपलब्ध योजना",
    eligibilityTitle: "नागरिक प्रोफाइल योजनांशी जुळवा",
    eligibilityCheck: "पात्रता तपासा",
    impactTitle: "परिणामाचा अंदाज घ्या",
    commonRs: "रु"
  },
  bn: {
    brandTagline: "কল্যাণ প্রকল্প সহায়ক",
    language: "ভাষা",
    navHome: "হোম",
    navChat: "চ্যাট",
    navEligibility: "যোগ্যতা",
    navSchemes: "প্রকল্প",
    navImpact: "প্রভাব",
    homeTitle: "আপনার জন্য দরকারি সরকারি প্রকল্প খুঁজুন",
    homeBody: "প্রশ্ন করুন, যোগ্যতা যাচাই করুন, সুবিধা তুলনা করুন এবং নথির তালিকা তৈরি করুন।",
    homeStartChat: "চ্যাট শুরু করুন",
    homeCheckEligibility: "যোগ্যতা যাচাই করুন",
    chatTitle: "প্রকল্প চ্যাট",
    chatSend: "পাঠান",
    schemesTitle: "সমর্থিত প্রকল্প",
    eligibilityTitle: "নাগরিক প্রোফাইলের সঙ্গে প্রকল্প মিলান",
    eligibilityCheck: "যোগ্যতা যাচাই করুন",
    impactTitle: "গ্রহণের প্রভাব অনুমান করুন",
    commonRs: "টাকা"
  },
  ta: {
    brandTagline: "நலத்திட்ட உதவியாளர்",
    language: "மொழி",
    navHome: "முகப்பு",
    navChat: "அரட்டை",
    navEligibility: "தகுதி",
    navSchemes: "திட்டங்கள்",
    navImpact: "தாக்கம்",
    homeTitle: "உங்களுக்கு பயன்படும் அரசு திட்டங்களை கண்டறியுங்கள்",
    homeBody: "கேள்விகள் கேளுங்கள், தகுதியை சரிபாருங்கள், நன்மைகளை ஒப்பிட்டு ஆவண பட்டியலை தயார் செய்யுங்கள்.",
    homeStartChat: "அரட்டை தொடங்கவும்",
    homeCheckEligibility: "தகுதி பார்க்கவும்",
    chatTitle: "திட்ட அரட்டை",
    chatSend: "அனுப்பு",
    schemesTitle: "கிடைக்கும் திட்டங்கள்",
    eligibilityTitle: "குடிமகன் விவரத்தை திட்டங்களுடன் பொருத்தவும்",
    eligibilityCheck: "தகுதி பார்க்கவும்",
    impactTitle: "ஏற்றுக்கொள்ளும் தாக்கத்தை மதிப்பிடுங்கள்",
    commonRs: "ரூ"
  },
  te: {
    brandTagline: "సంక్షేమ పథకాల సహాయకుడు",
    language: "భాష",
    navHome: "హోమ్",
    navChat: "చాట్",
    navEligibility: "అర్హత",
    navSchemes: "పథకాలు",
    navImpact: "ప్రభావం",
    homeTitle: "మీకు ఉపయోగపడే ప్రభుత్వ పథకాలను కనుగొనండి",
    homeBody: "ప్రశ్నలు అడగండి, అర్హతను తనిఖీ చేయండి, ప్రయోజనాలను పోల్చండి మరియు పత్రాల జాబితా సిద్ధం చేయండి.",
    homeStartChat: "చాట్ ప్రారంభించండి",
    homeCheckEligibility: "అర్హత తనిఖీ",
    chatTitle: "పథక చాట్",
    chatSend: "పంపండి",
    schemesTitle: "అందుబాటులో ఉన్న పథకాలు",
    eligibilityTitle: "పౌరుడి వివరాలను పథకాలతో సరిపోల్చండి",
    eligibilityCheck: "అర్హత తనిఖీ",
    impactTitle: "ప్రభావాన్ని అంచనా వేయండి",
    commonRs: "రూ"
  },
  kn: {
    brandTagline: "ಕಲ್ಯಾಣ ಯೋಜನೆ ಸಹಾಯಕ",
    language: "ಭಾಷೆ",
    navHome: "ಮುಖಪುಟ",
    navChat: "ಚಾಟ್",
    navEligibility: "ಅರ್ಹತೆ",
    navSchemes: "ಯೋಜನೆಗಳು",
    navImpact: "ಪ್ರಭಾವ",
    homeTitle: "ನಿಮಗೆ ಉಪಯುಕ್ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
    homeBody: "ಪ್ರಶ್ನೆಗಳು ಕೇಳಿ, ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ, ಲಾಭಗಳನ್ನು ಹೋಲಿಸಿ ಮತ್ತು ದಾಖಲೆಗಳ ಪಟ್ಟಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ.",
    homeStartChat: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    homeCheckEligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
    chatTitle: "ಯೋಜನೆ ಚಾಟ್",
    chatSend: "ಕಳುಹಿಸಿ",
    schemesTitle: "ಲಭ್ಯವಿರುವ ಯೋಜನೆಗಳು",
    eligibilityTitle: "ನಾಗರಿಕ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಯೋಜನೆಗಳಿಗೆ ಹೊಂದಿಸಿ",
    eligibilityCheck: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
    impactTitle: "ಪ್ರಭಾವ ಅಂದಾಜಿಸಿ",
    commonRs: "ರೂ"
  },
  ml: {
    brandTagline: "ക്ഷേമ പദ്ധതികളുടെ സഹായകൻ",
    language: "ഭാഷ",
    navHome: "ഹോം",
    navChat: "ചാറ്റ്",
    navEligibility: "അർഹത",
    navSchemes: "പദ്ധതികൾ",
    navImpact: "പ്രഭാവം",
    homeTitle: "നിങ്ങൾക്ക് ഉപകാരപ്പെടുന്ന സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക",
    homeBody: "ചോദ്യങ്ങൾ ചോദിക്കുക, അർഹത പരിശോധിക്കുക, ആനുകൂല്യങ്ങൾ താരതമ്യം ചെയ്യുക, രേഖകളുടെ പട്ടിക തയ്യാറാക്കുക.",
    homeStartChat: "ചാറ്റ് തുടങ്ങുക",
    homeCheckEligibility: "അർഹത പരിശോധിക്കുക",
    chatTitle: "പദ്ധതി ചാറ്റ്",
    chatSend: "അയയ്ക്കുക",
    schemesTitle: "ലഭ്യമായ പദ്ധതികൾ",
    eligibilityTitle: "പൗരന്റെ പ്രൊഫൈൽ പദ്ധതികളുമായി പൊരുത്തപ്പെടുത്തുക",
    eligibilityCheck: "അർഹത പരിശോധിക്കുക",
    impactTitle: "പ്രഭാവം കണക്കാക്കുക",
    commonRs: "രൂ"
  },
  gu: {
    brandTagline: "કલ્યાણ યોજના સહાયક",
    language: "ભાષા",
    navHome: "હોમ",
    navChat: "ચેટ",
    navEligibility: "પાત્રતા",
    navSchemes: "યોજનાઓ",
    navImpact: "અસર",
    homeTitle: "તમારા માટે ઉપયોગી સરકારી યોજનાઓ શોધો",
    homeBody: "પ્રશ્નો પૂછો, પાત્રતા તપાસો, લાભોની તુલના કરો અને દસ્તાવેજોની યાદી બનાવો.",
    homeStartChat: "ચેટ શરૂ કરો",
    homeCheckEligibility: "પાત્રતા તપાસો",
    chatTitle: "યોજના ચેટ",
    chatSend: "મોકલો",
    schemesTitle: "ઉપલબ્ધ યોજનાઓ",
    eligibilityTitle: "નાગરિક પ્રોફાઇલને યોજનાઓ સાથે મેળવો",
    eligibilityCheck: "પાત્રતા તપાસો",
    impactTitle: "અસરનો અંદાજ લો",
    commonRs: "રૂ"
  },
  pa: {
    brandTagline: "ਭਲਾਈ ਯੋਜਨਾ ਸਹਾਇਕ",
    language: "ਭਾਸ਼ਾ",
    navHome: "ਘਰ",
    navChat: "ਚੈਟ",
    navEligibility: "ਯੋਗਤਾ",
    navSchemes: "ਯੋਜਨਾਵਾਂ",
    navImpact: "ਅਸਰ",
    homeTitle: "ਆਪਣੇ ਲਈ ਲਾਭਕਾਰੀ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    homeBody: "ਸਵਾਲ ਪੁੱਛੋ, ਯੋਗਤਾ ਜਾਂਚੋ, ਲਾਭ ਮਿਲਾਓ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ।",
    homeStartChat: "ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ",
    homeCheckEligibility: "ਯੋਗਤਾ ਜਾਂਚੋ",
    chatTitle: "ਯੋਜਨਾ ਚੈਟ",
    chatSend: "ਭੇਜੋ",
    schemesTitle: "ਉਪਲਬਧ ਯੋਜਨਾਵਾਂ",
    eligibilityTitle: "ਨਾਗਰਿਕ ਪ੍ਰੋਫਾਈਲ ਨੂੰ ਯੋਜਨਾਵਾਂ ਨਾਲ ਮਿਲਾਓ",
    eligibilityCheck: "ਯੋਗਤਾ ਜਾਂਚੋ",
    impactTitle: "ਅਸਰ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ",
    commonRs: "ਰੁ"
  },
  ur: {
    brandTagline: "فلاحی اسکیم معاون",
    language: "زبان",
    navHome: "ہوم",
    navChat: "چیٹ",
    navEligibility: "اہلیت",
    navSchemes: "اسکیمیں",
    navImpact: "اثر",
    homeTitle: "اپنے لیے مفید سرکاری اسکیمیں تلاش کریں",
    homeBody: "سوال پوچھیں، اہلیت چیک کریں، فوائد کا موازنہ کریں اور دستاویزات کی فہرست بنائیں۔",
    homeStartChat: "چیٹ شروع کریں",
    homeCheckEligibility: "اہلیت چیک کریں",
    chatTitle: "اسکیم چیٹ",
    chatSend: "بھیجیں",
    schemesTitle: "دستیاب اسکیمیں",
    eligibilityTitle: "شہری پروفائل کو اسکیموں سے ملائیں",
    eligibilityCheck: "اہلیت چیک کریں",
    impactTitle: "اثر کا اندازہ لگائیں",
    commonRs: "روپے"
  }
};

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem("schemesathi-language") as AppLanguage | null;
    return saved && saved in localized ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("schemesathi-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => localized[language][key] || en[key]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
