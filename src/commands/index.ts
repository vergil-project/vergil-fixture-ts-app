import type { Command } from "commander";
import type { Context } from "../context.js";
import * as greet from "./greet.js";
import * as info from "./info.js";
import * as lower from "./lower.js";
import * as max from "./max.js";
import * as min from "./min.js";
import * as reverse from "./reverse.js";
import * as sum from "./sum.js";
import * as upper from "./upper.js";

/** A subcommand module: it adds its command to the program. */
export interface Subcommand {
  register(program: Command, context: Context): void;
}

/** Every subcommand, in the order `--help` lists them. */
export const subcommands: readonly Subcommand[] = [
  greet,
  sum,
  max,
  min,
  reverse,
  upper,
  lower,
  info,
];
