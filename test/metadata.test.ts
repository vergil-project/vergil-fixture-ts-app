import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseMetadata, readMetadata } from "../src/metadata.js";

describe("parseMetadata", () => {
  it("takes the name and version", () => {
    expect(parseMetadata('{"name": "app", "version": "1.2.3", "private": true}')).toEqual({
      name: "app",
      version: "1.2.3",
    });
  });

  it("fails on text that is not JSON", () => {
    expect(() => parseMetadata("{")).toThrow(SyntaxError);
  });

  it.each([
    ['{"version": "1.2.3"}', "name"],
    ['{"name": "app"}', "version"],
    ['{"name": "", "version": "1.2.3"}', "name"],
    ['{"name": "app", "version": 1}', "version"],
  ])("fails on %s, naming %s", (text, field) => {
    expect(() => parseMetadata(text)).toThrow(field);
  });
});

describe("readMetadata", () => {
  it("reads the repo's package.json", () => {
    const declared = JSON.parse(readFileSync("package.json", "utf8")) as {
      name: string;
      version: string;
    };
    expect(readMetadata()).toEqual({ name: declared.name, version: declared.version });
  });

  it("fails on a file that does not exist", () => {
    expect(() => readMetadata(new URL("file:///nonexistent/package.json"))).toThrow("ENOENT");
  });
});
