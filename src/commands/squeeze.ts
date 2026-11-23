import type { Command } from "commander";
import type { Context } from "../context.js";

/**
 * `text` with each run of whitespace inside it replaced by one space, and
 * its leading and trailing whitespace dropped. Whitespace is any Unicode
 * space or line terminator, as `String.prototype.trim` defines it.
 */
export function squeeze(text: string): string {
  return text
    .split(/\s+/u)
    .filter((part) => part !== "")
    .join(" ");
}

/** Adds `squeeze TEXT`, which prints `TEXT` with its whitespace collapsed. */
export function register(program: Command, { io }: Context): void {
  program
    .command("squeeze")
    .description("print TEXT with each run of whitespace collapsed to one space")
    .argument("<text>", "the text to squeeze")
    .action((text: string) => {
      io.out(`${squeeze(text)}\n`);
    });
}
