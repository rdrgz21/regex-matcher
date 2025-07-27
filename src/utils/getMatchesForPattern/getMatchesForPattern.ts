export function getMatchesForPattern(pattern: string, text: string): string[] {
  try {
    const cleaned = pattern.replace(/^\/|\/$/g, "");
    const regex = new RegExp(cleaned, "gi");
    return text.match(regex) || [];
  } catch {
    return [];
  }
}
