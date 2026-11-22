import type { Command } from "commander";
import type { Context } from "../context.js";

/**
 * `text` without its leading and trailing whitespace. Whitespace is any
 * Unicode space or line terminator, as `String.prototype.trim` defines it;
 * whitespace inside the text is kept.
 */
export function trim(text: string): string {
  return text.trim();
}

/** Adds `trim TEXT`, which prints `TEXT` without its surrounding whitespace. */
export function register(program: Command, { io }: Context): void {
  program
    .command("trim")
    .description("print TEXT without its leading and trailing whitespace")
    .argument("<text>", "the text to trim")
    .action((text: string) => {
      io.out(`${trim(text)}\n`);
    });
}
