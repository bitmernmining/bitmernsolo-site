const WORDS_PER_MINUTE = 200;

export function computeReadTime(html: string): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, " ").trim();
  if (!text) return 1;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
