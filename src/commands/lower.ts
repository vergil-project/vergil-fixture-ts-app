import type { Command } from "commander";
import type { Context } from "../context.js";

/**
 * `text` in lower case, by Unicode's default case mapping, which does not
 * depend on the locale. A capital sigma becomes `ς` at the end of a word and
 * `σ` elsewhere.
 */
export function lower(text: string): string {
  return text.toLowerCase();
}

/** Adds `lower TEXT`, which prints `TEXT` in lower case. */
export function register(program: Command, { io }: Context): void {
  program
    .command("lower")
    .description("print TEXT in lower case")
    .argument("<text>", "the text to convert")
    .action((text: string) => {
      io.out(`${lower(text)}\n`);
    });
}
