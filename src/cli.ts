import { Command, CommanderError } from "commander";
import { subcommands } from "./commands/index.js";
import { CommandError, type Context } from "./context.js";

/**
 * Builds the program's command-line parser. Commander writes through
 * `context.io` and throws instead of exiting, so `run` decides the exit code.
 */
export function buildProgram(context: Context): Command {
  const { io, metadata } = context;
  const program = new Command(metadata.name)
    .description("Vergil test fixture: a small TypeScript command-line application.")
    .version(metadata.version)
    .configureOutput({
      writeOut: (text) => io.out(text),
      writeErr: (text) => io.err(text),
    })
    .exitOverride();
  // Each subcommand inherits the output and exit settings above, so they are
  // set before any subcommand is added.
  for (const subcommand of subcommands) {
    subcommand.register(program, context);
  }
  return program;
}

/**
 * Runs the program on `argv` (the arguments after the program name) and
 * returns its exit code: `0` on success, `--help` and `--version` included;
 * `1` on a usage error, after commander's message, or on a failed command,
 * after `error:` and the reason.
 */
export function run(argv: readonly string[], context: Context): number {
  try {
    buildProgram(context).parse(argv, { from: "user" });
    return 0;
  } catch (err) {
    if (err instanceof CommanderError) {
      return err.exitCode;
    }
    if (err instanceof CommandError) {
      context.io.err(`error: ${err.message}\n`);
      return 1;
    }
    throw err;
  }
}
