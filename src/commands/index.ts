import type { Command } from "commander";
import type { Context } from "../context.js";
import * as greet from "./greet.js";
import * as info from "./info.js";
import * as max from "./max.js";
import * as sum from "./sum.js";

/** A subcommand module: it adds its command to the program. */
export interface Subcommand {
  register(program: Command, context: Context): void;
}

/** Every subcommand, in the order `--help` lists them. */
export const subcommands: readonly Subcommand[] = [greet, sum, max, info];
