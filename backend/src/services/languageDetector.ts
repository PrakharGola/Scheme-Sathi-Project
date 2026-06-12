export function detectLanguageFromText(
  text: string,
  fallback: string = "en"
): string {
  // Extremely naive; in production, use a proper library.
  if (/[अ-ह]/.test(text)) return "hi";
  if (/[অ-ঔ]/.test(text)) return "bn";
  // etc.
  return fallback;
}
