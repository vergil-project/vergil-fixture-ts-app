import { InvalidArgumentError } from "commander";
import { describe, expect, it } from "vitest";
import { capitalize } from "../src/commands/capitalize.js";
import { greet } from "../src/commands/greet.js";
import { info } from "../src/commands/info.js";
import { length } from "../src/commands/length.js";
import { lower } from "../src/commands/lower.js";
import { max } from "../src/commands/max.js";
import { min } from "../src/commands/min.js";
import { palindrome } from "../src/commands/palindrome.js";
import { reverse } from "../src/commands/reverse.js";
import { squeeze } from "../src/commands/squeeze.js";
import { sum } from "../src/commands/sum.js";
import { trim } from "../src/commands/trim.js";
import { upper } from "../src/commands/upper.js";
import { words } from "../src/commands/words.js";
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

describe("length", () => {
  it("is 0 for empty text", () => {
    expect(length("")).toBe(0);
  });

  it("counts the characters", () => {
    expect(length("Ada Lovelace")).toBe(12);
  });

  it("counts a letter and its combining mark as one", () => {
    expect(length("cafe\u0301!")).toBe(5);
  });

  it("counts an emoji sequence as one", () => {
    const family = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}";
    expect(length(`a${family}b`)).toBe(3);
  });
});

describe("words", () => {
  it("is 0 for empty text", () => {
    expect(words("")).toBe(0);
  });

  it("is 0 for text with no words", () => {
    expect(words("  , ! ")).toBe(0);
  });

  it("counts the words and numbers, not the spaces and punctuation", () => {
    expect(words("Ada Lovelace, 1815!")).toBe(3);
  });

  it("keeps a word with an apostrophe whole", () => {
    expect(words("don't  stop")).toBe(2);
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

describe("lower", () => {
  it("is empty for empty text", () => {
    expect(lower("")).toBe("");
  });

  it("lower-cases the letters and leaves the rest", () => {
    expect(lower("Ada LOVELACE, 1815!")).toBe("ada lovelace, 1815!");
  });

  it("uses the final form for a capital sigma that ends a word", () => {
    expect(lower("\u039F\u0394\u039F\u03A3")).toBe("\u03BF\u03B4\u03BF\u03C2");
  });
});

describe("trim", () => {
  it("is empty for empty or blank text", () => {
    expect(trim("")).toBe("");
    expect(trim(" \t\n ")).toBe("");
  });

  it("drops the leading and trailing whitespace and keeps the inner", () => {
    expect(trim("  Ada  Lovelace\t\n")).toBe("Ada  Lovelace");
  });

  it("treats a Unicode space as whitespace", () => {
    expect(trim(" Ada　")).toBe("Ada");
  });
});

describe("capitalize", () => {
  it("is empty for empty text", () => {
    expect(capitalize("")).toBe("");
  });

  it("upper-cases the first character and leaves the rest", () => {
    expect(capitalize("ada lovelace")).toBe("Ada lovelace");
    expect(capitalize("aDA")).toBe("ADA");
  });

  it("leaves text that does not start with a lower-case letter", () => {
    expect(capitalize("Ada")).toBe("Ada");
    expect(capitalize(" ada")).toBe(" ada");
  });

  it("keeps a combining mark with its letter", () => {
    expect(capitalize("e\u0301cole")).toBe("E\u0301cole");
  });

  it("maps a letter to more than one by the default case mapping", () => {
    expect(capitalize("\u00DFa")).toBe("SSa");
  });
});

describe("squeeze", () => {
  it("is empty for empty or blank text", () => {
    expect(squeeze("")).toBe("");
    expect(squeeze(" \t\n ")).toBe("");
  });

  it("collapses each inner run of whitespace to one space and drops the outer", () => {
    expect(squeeze("  Ada  \t Lovelace\n\n1815 ")).toBe("Ada Lovelace 1815");
  });

  it("leaves text with single spaces as it is", () => {
    expect(squeeze("Ada Lovelace")).toBe("Ada Lovelace");
  });

  it("treats a Unicode space as whitespace", () => {
    expect(squeeze("Ada 　Lovelace")).toBe("Ada Lovelace");
  });
});

describe("palindrome", () => {
  it("holds for empty text and one character", () => {
    expect(palindrome("")).toBe(true);
    expect(palindrome("a")).toBe(true);
  });

  it("holds for text that reads the same reversed", () => {
    expect(palindrome("level")).toBe(true);
    expect(palindrome("abba")).toBe(true);
  });

  it("fails for text that does not", () => {
    expect(palindrome("Ada Lovelace")).toBe(false);
  });

  it("compares case, spaces and punctuation exactly", () => {
    expect(palindrome("Level")).toBe(false);
    expect(palindrome("a b a")).toBe(true);
    expect(palindrome("ab a")).toBe(false);
  });

  it("keeps a combining mark with its letter", () => {
    expect(palindrome("e\u0301ae\u0301")).toBe(true);
  });

  it("keeps an emoji sequence whole", () => {
    const family = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}";
    expect(palindrome(`a${family}a`)).toBe(true);
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
