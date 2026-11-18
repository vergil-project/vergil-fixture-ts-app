import type { Command } from "commander";
import type { Context } from "../context.js";

/**
 * `text` in upper case, by Unicode's default case mapping, which does not
 * depend on the locale. A letter may map to more than one, so `ß` becomes `SS`.
 */
export function upper(text: string): string {
  return text.toUpperCase();
}

/** Adds `upper TEXT`, which prints `TEXT` in upper case. */
export function register(program: Command, { io }: Context): void {
  program
    .command("upper")
    .description("print TEXT in upper case")
    .argument("<text>", "the text to convert")
    .action((text: string) => {
      io.out(`${upper(text)}\n`);
    });
}
