import type { Command } from "commander";
import { parseInteger } from "../integers.js";
import { CommandError, type Context } from "../context.js";

const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE = BigInt(Number.MIN_SAFE_INTEGER);

/**
 * The product of `numbers`, `1` for none. A product outside the safe integer
 * range throws a `CommandError`, never a rounded result. The product is
 * multiplied exactly, so a zero among very large numbers still gives `0`.
 */
export function product(numbers: readonly number[]): number {
  const total = numbers.reduce((acc, n) => acc * BigInt(n), 1n);
  if (total > MAX_SAFE || total < MIN_SAFE) {
    throw new CommandError("the product is out of the safe integer range");
  }
  return Number(total);
}

/** Collects each variadic argument, parsed, onto the ones before it. */
function collect(value: string, previous: number[] = []): number[] {
  return [...previous, parseInteger(value)];
}

/** Adds `product [NUMBERS...]`, which prints the product of the integers. */
export function register(program: Command, { io }: Context): void {
  program
    .command("product")
    .description("print the product of the integers, 1 for none")
    .argument("[numbers...]", "the integers to multiply", collect)
    // Commander passes [] when no number is given.
    .action((numbers: number[]) => {
      io.out(`${product(numbers)}\n`);
    });
}
