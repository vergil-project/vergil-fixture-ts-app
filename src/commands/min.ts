import type { Command } from "commander";
import { parseInteger } from "../integers.js";
import type { Context } from "../context.js";

/** The smallest of `numbers`, of which there is at least one. */
export function min(numbers: readonly [number, ...number[]]): number {
  return Math.min(...numbers);
}

/** Collects each variadic argument, parsed, onto the ones before it. */
function collect(value: string, previous: number[] = []): number[] {
  return [...previous, parseInteger(value)];
}

/** Adds `min NUMBERS...`, which prints the smallest of one or more integers. */
export function register(program: Command, { io }: Context): void {
  program
    .command("min")
    .description("print the smallest of one or more integers")
    .argument("<numbers...>", "the integers to compare", collect)
    // The argument is required, so commander passes at least one number.
    .action((numbers: [number, ...number[]]) => {
      io.out(`${min(numbers)}\n`);
    });
}
