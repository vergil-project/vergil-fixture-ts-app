#!/usr/bin/env node
// The `vergil-fixture-ts-app` binary: run the program on the process's
// arguments, and set the process's exit code from its outcome.
import process from "node:process";
import { run } from "./cli.js";
import { readMetadata } from "./metadata.js";

process.exitCode = run(process.argv.slice(2), {
  io: {
    out: (text) => process.stdout.write(text),
    err: (text) => process.stderr.write(text),
  },
  metadata: readMetadata(),
});
