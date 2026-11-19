import type { Command } from "commander";
import type { Context } from "../context.js";
import { graphemes } from "../graphemes.js";

/**
 * `text` with its characters in reverse order. A character is a grapheme
 * cluster, so a combining mark or an emoji sequence stays whole.
 */
export function reverse(text: string): string {
  return graphemes(text).reverse().join("");
}

/** Adds `reverse TEXT`, which prints `TEXT` with its characters reversed. */
export function register(program: Command, { io }: Context): void {
  program
    .command("reverse")
    .description("print TEXT with its characters in reverse order")
    .argument("<text>", "the text to reverse")
    .action((text: string) => {
      io.out(`${reverse(text)}\n`);
    });
}
