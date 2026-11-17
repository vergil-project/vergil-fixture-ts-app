import type { Metadata } from "./metadata.js";

/** Where the program writes: standard output and standard error. */
export interface Io {
  /** Writes `text` to standard output, as given. */
  out(text: string): void;
  /** Writes `text` to standard error, as given. */
  err(text: string): void;
}

/** What every subcommand is given: where to write, and the program's metadata. */
export interface Context {
  io: Io;
  metadata: Metadata;
}

/**
 * A subcommand's failure. `run` prints its message after `error:` on standard
 * error and exits 1. Anything else a subcommand throws is a defect, and
 * propagates.
 */
export class CommandError extends Error {
  override name = "CommandError";
}
