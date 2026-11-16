import type { Command } from "commander";
import type { Context } from "../context.js";
import type { Metadata } from "../metadata.js";

/** The program's name and version as one line of JSON. */
export function info(metadata: Metadata): string {
  return JSON.stringify({ name: metadata.name, version: metadata.version });
}

/** Adds `info`, which prints the program's name and version as JSON. */
export function register(program: Command, { io, metadata }: Context): void {
  program
    .command("info")
    .description("print the program's name and version as JSON")
    .action(() => {
      io.out(`${info(metadata)}\n`);
    });
}
