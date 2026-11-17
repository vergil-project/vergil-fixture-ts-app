import { run } from "../src/cli.js";
import type { Metadata } from "../src/metadata.js";

/** What one run of the program wrote and returned. */
export interface Outcome {
  code: number;
  out: string;
  err: string;
}

/** Fixed metadata, so a test never depends on the version in `package.json`. */
export const METADATA: Metadata = { name: "vergil-fixture-ts-app", version: "9.8.7" };

/** Runs the program on `argv` with captured output. */
export function runCaptured(argv: readonly string[]): Outcome {
  let out = "";
  let err = "";
  const code = run(argv, {
    io: {
      out: (text) => {
        out += text;
      },
      err: (text) => {
        err += text;
      },
    },
    metadata: METADATA,
  });
  return { code, out, err };
}
