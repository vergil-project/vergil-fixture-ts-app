import type { Command } from "commander";
import type { Context } from "../context.js";
import { graphemes } from "../graphemes.js";

/**
 * `text` with its first character in upper case and the rest left as they
 * are. A character is a grapheme cluster, as for `reverse`, so a combining
 * mark stays with its letter. The case mapping is Unicode's default, as for
 * `upper`, so a leading `ß` becomes `SS`. Empty text stays empty.
 */
export function capitalize(text: string): string {
  const [first = "", ...rest] = graphemes(text);
  return first.toUpperCase() + rest.join("");
}

/** Adds `capitalize TEXT`, which prints `TEXT` with its first character in upper case. */
export function register(program: Command, { io }: Context): void {
  program
    .command("capitalize")
    .description("print TEXT with its first character in upper case")
    .argument("<text>", "the text to capitalize")
    .action((text: string) => {
      io.out(`${capitalize(text)}\n`);
    });
}
