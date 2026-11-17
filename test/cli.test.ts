import { describe, expect, it } from "vitest";
import { run } from "../src/cli.js";
import { METADATA, runCaptured } from "./helpers.js";

describe("run", () => {
  it("greets", () => {
    expect(runCaptured(["greet", "Ada"])).toEqual({ code: 0, out: "Hello, Ada\n", err: "" });
  });

  it("sums no numbers to 0", () => {
    expect(runCaptured(["sum"])).toEqual({ code: 0, out: "0\n", err: "" });
  });

  it("sums numbers, negative ones included", () => {
    expect(runCaptured(["sum", "1", "2", "-4"])).toEqual({ code: 0, out: "-1\n", err: "" });
  });

  it("prints the largest number", () => {
    expect(runCaptured(["max", "1", "7", "-4"])).toEqual({ code: 0, out: "7\n", err: "" });
  });

  it("prints the text reversed", () => {
    expect(runCaptured(["reverse", "Ada"])).toEqual({ code: 0, out: "adA\n", err: "" });
  });

  it("prints its metadata as JSON", () => {
    expect(runCaptured(["info"])).toEqual({
      code: 0,
      out: '{"name":"vergil-fixture-ts-app","version":"9.8.7"}\n',
      err: "",
    });
  });

  it("prints its version", () => {
    expect(runCaptured(["--version"])).toEqual({ code: 0, out: "9.8.7\n", err: "" });
  });

  it("lists every subcommand in its help", () => {
    const outcome = runCaptured(["--help"]);
    expect(outcome.code).toBe(0);
    expect(outcome.err).toBe("");
    expect(outcome.out).toMatch(/^Usage: vergil-fixture-ts-app /);
    for (const name of [
      "greet <name>",
      "sum [numbers...]",
      "max <numbers...>",
      "reverse <text>",
      "info",
    ]) {
      expect(outcome.out).toContain(name);
    }
  });

  it("prints a subcommand's help", () => {
    const outcome = runCaptured(["greet", "--help"]);
    expect(outcome.code).toBe(0);
    expect(outcome.out).toMatch(/^Usage: vergil-fixture-ts-app greet \[options\] <name>/);
  });

  it("fails with usage when no subcommand is given", () => {
    const outcome = runCaptured([]);
    expect(outcome.code).toBe(1);
    expect(outcome.out).toBe("");
    expect(outcome.err).toMatch(/^Usage: vergil-fixture-ts-app /);
  });

  it("fails on an unknown subcommand", () => {
    expect(runCaptured(["nope"])).toEqual({
      code: 1,
      out: "",
      err: "error: unknown command 'nope'\n",
    });
  });

  it("fails on a missing argument", () => {
    expect(runCaptured(["greet"])).toEqual({
      code: 1,
      out: "",
      err: "error: missing required argument 'name'\n",
    });
  });

  it("fails on reverse with no text", () => {
    expect(runCaptured(["reverse"])).toEqual({
      code: 1,
      out: "",
      err: "error: missing required argument 'text'\n",
    });
  });

  it("fails on max with no numbers", () => {
    expect(runCaptured(["max"])).toEqual({
      code: 1,
      out: "",
      err: "error: missing required argument 'numbers'\n",
    });
  });

  it("fails on a max argument that is not an integer", () => {
    expect(runCaptured(["max", "1", "x"])).toEqual({
      code: 1,
      out: "",
      err: "error: command-argument value 'x' is invalid for argument 'numbers'. not an integer\n",
    });
  });

  it("fails on an argument that is not an integer", () => {
    expect(runCaptured(["sum", "1", "two"])).toEqual({
      code: 1,
      out: "",
      err: "error: command-argument value 'two' is invalid for argument 'numbers'. not an integer\n",
    });
  });

  it("fails on a sum out of the safe range, with the reason", () => {
    expect(runCaptured(["sum", String(Number.MAX_SAFE_INTEGER), "1"])).toEqual({
      code: 1,
      out: "",
      err: "error: the sum is out of the safe integer range\n",
    });
  });

  it("propagates an error that is not a command's failure", () => {
    const defect = new Error("a defect");
    const io = {
      out: () => {
        throw defect;
      },
      err: () => undefined,
    };
    expect(() => run(["greet", "Ada"], { io, metadata: METADATA })).toThrow(defect);
  });
});
