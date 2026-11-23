import type { Command } from "commander";
import type { Context } from "../context.js";
import { reverse } from "./reverse.js";

/**
 * Whether `text` reads the same with its characters reversed, compared
 * exactly: case, spaces and punctuation all count. A character is a grapheme
 * cluster, as for `reverse`, so empty text and one character are palindromes.
 */
export function palindrome(text: string): boolean {
  return reverse(text) === text;
}

/** Adds `palindrome TEXT`, which prints whether `TEXT` is a palindrome. */
export function register(program: Command, { io }: Context): void {
  program
    .command("palindrome")
    .description("print true if TEXT reads the same reversed, false if not")
    .argument("<text>", "the text to check")
    .action((text: string) => {
      io.out(`${palindrome(text)}\n`);
    });
}
