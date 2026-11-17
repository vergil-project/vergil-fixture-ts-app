import type { Command } from "commander";
import { parseInteger } from "../integers.js";
import type { Context } from "../context.js";

/** The largest of `numbers`, of which there is at least one. */
export function max(numbers: readonly [number, ...number[]]): number {
  return Math.max(...numbers);
}

/** Collects each variadic argument, parsed, onto the ones before it. */
function collect(value: string, previous: number[] = []): number[] {
  return [...previous, parseInteger(value)];
}

/** Adds `max NUMBERS...`, which prints the largest of one or more integers. */
export function register(program: Command, { io }: Context): void {
  program
    .command("max")
    .description("print the largest of one or more integers")
    .argument("<numbers...>", "the integers to compare", collect)
    // The argument is required, so commander passes at least one number.
    .action((numbers: [number, ...number[]]) => {
      io.out(`${max(numbers)}\n`);
    });
}
