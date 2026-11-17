import process from "node:process";
import { afterEach, describe, expect, it, vi } from "vitest";

// The binary runs on import, so each test sets the process's arguments, spies
// on its output, imports a fresh copy and checks the exit code it set.
describe("main", () => {
  const argv = process.argv;

  afterEach(() => {
    process.argv = argv;
    process.exitCode = undefined;
    vi.restoreAllMocks();
    vi.resetModules();
  });

  async function runMain(args: string[]): Promise<{ out: string; err: string }> {
    let out = "";
    let err = "";
    vi.spyOn(process.stdout, "write").mockImplementation((text) => {
      out += String(text);
      return true;
    });
    vi.spyOn(process.stderr, "write").mockImplementation((text) => {
      err += String(text);
      return true;
    });
    process.argv = ["node", "vergil-fixture-ts-app", ...args];
    await import("../src/main.js");
    return { out, err };
  }

  it("writes the result to standard output and exits 0", async () => {
    expect(await runMain(["greet", "Ada"])).toEqual({ out: "Hello, Ada\n", err: "" });
    expect(process.exitCode).toBe(0);
  });

  it("writes a failure to standard error and exits 1", async () => {
    expect(await runMain(["nope"])).toEqual({ out: "", err: "error: unknown command 'nope'\n" });
    expect(process.exitCode).toBe(1);
  });
});
