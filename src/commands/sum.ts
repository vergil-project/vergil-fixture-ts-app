import type { Command } from "commander";
import { parseInteger } from "../integers.js";
import { CommandError, type Context } from "../context.js";

/**
 * The sum of `numbers`, `0` for none. A sum outside the safe integer range
 * throws a `CommandError`, never a rounded result.
 */
export function sum(numbers: readonly number[]): number {
  const total = numbers.reduce((acc, n) => acc + n, 0);
  if (!Number.isSafeInteger(total)) {
    throw new CommandError("the sum is out of the safe integer range");
  }
  return total;
}

/** Collects each variadic argument, parsed, onto the ones before it. */
function collect(value: string, previous: number[] = []): number[] {
  return [...previous, parseInteger(value)];
}

/** Adds `sum [NUMBERS...]`, which prints the sum of the integers. */
export function register(program: Command, { io }: Context): void {
  program
    .command("sum")
    .description("print the sum of the integers, 0 for none")
    .argument("[numbers...]", "the integers to add", collect)
    // Commander passes [] when no number is given.
    .action((numbers: number[]) => {
      io.out(`${sum(numbers)}\n`);
    });
}
