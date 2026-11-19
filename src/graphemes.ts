/** Splits text into user-perceived characters (extended grapheme clusters). */
const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/**
 * The user-perceived characters of `text`, in order. A character is a grapheme
 * cluster, so a combining mark or an emoji sequence stays whole.
 */
export function graphemes(text: string): string[] {
  return Array.from(segmenter.segment(text), ({ segment }) => segment);
}
