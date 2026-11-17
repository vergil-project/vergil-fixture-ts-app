import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    coverage: {
      // Measure the program's own source, never the built dist/ or the tests.
      include: ["src/**/*.ts"],
    },
  },
});
