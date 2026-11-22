import type { Command } from "commander";
import type { Context } from "../context.js";

/** Splits text into words and the spaces and punctuation between them. */
const segmenter = new Intl.Segmenter(undefined, { granularity: "word" });

/**
 * The number of words in `text`, by Unicode's default word boundaries. A
 * number counts as a word; spaces and punctuation do not, and an apostrophe
 * inside a word keeps it whole.
 */
export function words(text: string): number {
  let count = 0;
  for (const { isWordLike } of segmenter.segment(text)) {
    if (isWordLike === true) {
      count += 1;
    }
  }
  return count;
}

/** Adds `words TEXT`, which prints the number of words in `TEXT`. */
export function register(program: Command, { io }: Context): void {
  program
    .command("words")
    .description("print the number of words in TEXT")
    .argument("<text>", "the text to count")
    .action((text: string) => {
      io.out(`${words(text)}\n`);
    });
}
