import type { Command } from "commander";
import type { Context } from "../context.js";

/** The greeting for `name`. */
export function greet(name: string): string {
  return `Hello, ${name}`;
}

/** Adds `greet NAME`, which prints a greeting for `NAME`. */
export function register(program: Command, { io }: Context): void {
  program
    .command("greet")
    .description("print a greeting for NAME")
    .argument("<name>", "who to greet")
    .action((name: string) => {
      io.out(`${greet(name)}\n`);
    });
}
