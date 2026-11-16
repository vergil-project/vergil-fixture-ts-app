import { InvalidArgumentError } from "commander";
import { z } from "zod";

/** A command-line integer: optional sign, decimal digits, within the safe range. */
const integerArgument = z
  .string()
  .regex(/^[+-]?\d+$/, "not an integer")
  .transform(Number)
  .pipe(z.int("out of the safe integer range"));

/**
 * Parses one command-line integer. An invalid value throws commander's
 * `InvalidArgumentError`, so commander reports it as a usage error naming the
 * argument.
 */
export function parseInteger(value: string): number {
  const result = integerArgument.safeParse(value);
  if (!result.success) {
    const reason = result.error.issues.map((issue) => issue.message).join("; ");
    throw new InvalidArgumentError(reason);
  }
  return result.data;
}
