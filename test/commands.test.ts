import { InvalidArgumentError } from "commander";
import { describe, expect, it } from "vitest";
import { greet } from "../src/commands/greet.js";
import { info } from "../src/commands/info.js";
import { max } from "../src/commands/max.js";
import { min } from "../src/commands/min.js";
import { reverse } from "../src/commands/reverse.js";
import { sum } from "../src/commands/sum.js";
import { upper } from "../src/commands/upper.js";
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

describe("max", () => {
  it("is the only number of one", () => {
    expect(max([-3])).toBe(-3);
  });

  it("is the largest number", () => {
    expect(max([1, 7, -4, 7])).toBe(7);
  });
});

describe("min", () => {
  it("is the only number of one", () => {
    expect(min([-3])).toBe(-3);
  });

  it("is the smallest number", () => {
    expect(min([1, -4, 7, -4])).toBe(-4);
  });
});

describe("reverse", () => {
  it("is empty for empty text", () => {
    expect(reverse("")).toBe("");
  });

  it("reverses the characters", () => {
    expect(reverse("Ada Lovelace")).toBe("ecalevoL adA");
  });

  it("keeps a combining mark with its letter", () => {
    expect(reverse("cafe\u0301!")).toBe("!e\u0301fac");
  });

  it("keeps an emoji sequence whole", () => {
    const family = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}";
    expect(reverse(`a${family}b`)).toBe(`b${family}a`);
  });
});

describe("upper", () => {
  it("is empty for empty text", () => {
    expect(upper("")).toBe("");
  });

  it("upper-cases the letters and leaves the rest", () => {
    expect(upper("Ada Lovelace, 1815!")).toBe("ADA LOVELACE, 1815!");
  });

  it("maps a letter to more than one when Unicode says so", () => {
    expect(upper("stra\u00DFe")).toBe("STRASSE");
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
