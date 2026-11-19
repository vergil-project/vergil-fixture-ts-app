import type { Command } from "commander";
import type { Context } from "../context.js";
import { graphemes } from "../graphemes.js";

/**
 * The number of characters in `text`. A character is a grapheme cluster, so a
 * combining mark or an emoji sequence counts as one.
 */
export function length(text: string): number {
  return graphemes(text).length;
}

/** Adds `length TEXT`, which prints the number of characters in `TEXT`. */
export function register(program: Command, { io }: Context): void {
  program
    .command("length")
    .description("print the number of characters in TEXT")
    .argument("<text>", "the text to measure")
    .action((text: string) => {
      io.out(`${length(text)}\n`);
    });
}
