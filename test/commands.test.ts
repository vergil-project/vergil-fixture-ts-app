import { InvalidArgumentError } from "commander";
import { describe, expect, it } from "vitest";
import { greet } from "../src/commands/greet.js";
import { info } from "../src/commands/info.js";
import { sum } from "../src/commands/sum.js";
import { CommandError } from "../src/context.js";
import { parseInteger } from "../src/integers.js";

describe("greet", () => {
  it("greets the name", () => {
    expect(greet("Ada")).toBe("Hello, Ada");
  });
});

describe("sum", () => {
  it("is 0 for no numbers", () => {
    expect(sum([])).toBe(0);
  });

  it("adds the numbers", () => {
    expect(sum([1, 2, -4])).toBe(-1);
  });

  it("fails rather than round a sum out of the safe range", () => {
    expect(() => sum([Number.MAX_SAFE_INTEGER, 1])).toThrow(
      new CommandError("the sum is out of the safe integer range"),
    );
  });
});

describe("info", () => {
  it("is the name and version as JSON", () => {
    expect(info({ name: "app", version: "1.2.3" })).toBe('{"name":"app","version":"1.2.3"}');
  });
});

describe("parseInteger", () => {
  it.each([
    ["0", 0],
    ["42", 42],
    ["-7", -7],
    ["+7", 7],
    [String(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER],
  ])("parses %s", (text, value) => {
    expect(parseInteger(text)).toBe(value);
  });

  it.each(["", "1.5", "1e3", "x", " 1", "0x10"])("rejects %j as not an integer", (text) => {
    expect(() => parseInteger(text)).toThrow(new InvalidArgumentError("not an integer"));
  });

  it("rejects an integer out of the safe range", () => {
    expect(() => parseInteger("9007199254740992")).toThrow(
      new InvalidArgumentError("out of the safe integer range"),
    );
  });
});
