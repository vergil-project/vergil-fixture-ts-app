import { readFileSync } from "node:fs";
import { z } from "zod";

/** The program's name and version, as its `package.json` declares them. */
export interface Metadata {
  name: string;
  version: string;
}

const packageJson = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
});

/** The repo's `package.json`, one level above both `src/` and the built `dist/`. */
const PACKAGE_JSON = new URL("../package.json", import.meta.url);

/**
 * Parses a `package.json` text into the program's metadata. Invalid JSON, or a
 * missing or empty `name` or `version`, throws.
 */
export function parseMetadata(text: string): Metadata {
  const parsed = packageJson.parse(JSON.parse(text));
  return { name: parsed.name, version: parsed.version };
}

/** Reads the program's metadata from its `package.json`. */
export function readMetadata(path: URL = PACKAGE_JSON): Metadata {
  return parseMetadata(readFileSync(path, "utf8"));
}
