import { prisma } from "../config/db";
import { detectLanguageFromText } from "./languageDetector";
import { env } from "../config/env";

// TODO: Replace this stub with real Gemini + embeddings.
// For now, we will just pick a few schemes and respond deterministically.

export async function chatWithSchemes(params: {
  message: string;
  language?: string;
  userId?: string;
}) {
  const lang = params.language || detectLanguageFromText(params.message, "en");

  // Retrieve a few schemes (simple heuristic)
  const schemes = await prisma.scheme.findMany({
    take: 3,
    orderBy: { name: "asc" }
  });

  // Simple rule-based answer:
  let reply: string;
  const sources = schemes.map(s => ({ schemeId: s.id, name: s.name }));

  const lower = params.message.toLowerCase();
  const isFarmerQuestion =
    lower.includes("farmer") ||
    lower.includes("किसान") ||
    lower.includes("कृषक") ||
    lower.includes("kisan");

  if (isFarmerQuestion) {
    const farmerSchemes = schemes.filter(s =>
      (s.eligibility || "").toLowerCase().includes("farmer")
    );
    if (farmerSchemes.length > 0) {
      reply = buildFarmerReply(lang, farmerSchemes);
    } else {
      reply = buildNoDataReply(lang);
    }
  } else {
    reply = buildGenericReply(lang, schemes);
  }

  const conversation = await prisma.conversation.create({
    data: {
      userId: params.userId || null,
      language: lang,
      messages: [
        { role: "user", content: params.message },
        { role: "assistant", content: reply, sources }
      ] as any
    }
  });

  return { reply, language: lang, sources, conversationId: conversation.id };
}

function buildFarmerReply(
  lang: string,
  schemes: { name: string; description: string }[]
): string {
  const names = schemes.map(s => s.name).join(", ");
  if (lang === "hi") {
    return `आप किसान हैं, इसलिए आपके लिए ये योजनाएँ उपयोगी हो सकती हैं: ${names}।\n\nहर योजना के लिए योग्यता, लाभ और ज़रूरी दस्तावेज़ Scheme Explorer में देखें या Eligibility Checker भरें।`;
  }
  return `Since you are a farmer, these schemes may be relevant for you: ${names}.\n\nCheck eligibility, benefits, and required documents in the Scheme Explorer or by using the Eligibility Checker.`;
}

function buildGenericReply(
  lang: string,
  schemes: { name: string; description: string }[]
): string {
  const names = schemes.map(s => s.name).join(", ");
  if (lang === "hi") {
    return `हमारे डेटाबेस में वर्तमान में ये प्रमुख योजनाएँ उपलब्ध हैं: ${names}।\n\nआप Eligibility Checker भरकर अपने लिए सही योजनाएँ देख सकते हैं।`;
  }
  return `Currently our database covers these key schemes: ${names}.\n\nUse the Eligibility Checker to see which ones you qualify for.`;
}

function buildNoDataReply(lang: string): string {
  if (lang === "hi") {
    return "माफ़ कीजिए, मैं यह जानकारी हमारी आधिकारिक योजना डेटाबेस से सत्यापित नहीं कर पा रहा हूँ।";
  }
  return "Sorry, I cannot verify that information from the official scheme database.";
}
