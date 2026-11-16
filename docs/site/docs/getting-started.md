# Getting Started

The fixture is an npm package, private to the repo, with one binary,
`vergil-fixture-ts-app`. It needs Node.js 24 or later.

## Build and run

From a clone of the repository:

```console
$ npm ci --ignore-scripts
$ npm run build
$ node dist/main.js greet Ada
Hello, Ada
```

`npm run build` compiles `src/` to `dist/` with `tsconfig.build.json`, and
`dist/main.js` is the binary the package's `bin` entry names.

## Validate

As in every Vergil repo, validation runs in the Vergil dev container, and
nothing else is the gate:

```bash
vrg-container-run -- vrg-validate
```

## Layout

| Path              | Holds                                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| `src/main.ts`     | the binary: run the program on the process's arguments and set its exit code   |
| `src/cli.ts`      | `buildProgram`, the `commander` parser, and `run`, which returns the exit code |
| `src/context.ts`  | the `Io` and `Context` a subcommand is given, and `CommandError`               |
| `src/commands/`   | one module per subcommand, and `index.ts`, which lists them                    |
| `src/integers.ts` | the `zod` parser for integer arguments                                         |
| `src/metadata.ts` | the program's name and version, read from `package.json`                       |
| `test/`           | the Vitest tests, which cover every line of `src/`                             |

## Configuration

| File                  | Holds                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| `tsconfig.json`       | extends Vergil's managed `tsconfig.vergil.json`; type-checks `src/` and `test/` |
| `tsconfig.build.json` | the build: `src/` only, emitted to `dist/`                                      |
| `eslint.config.mjs`   | spreads Vergil's managed `eslint.vergil.config.mjs`                             |
| `vitest.config.ts`    | the test files, and coverage measured over `src/`                               |

`tsconfig.vergil.json`, `eslint.vergil.config.mjs` and `.prettierrc.json` are
written by Vergil's fleet sync. They are never edited here.

## Adding a subcommand

A fixture run grows the program by one subcommand at a time, with no
restructuring:

1. Add `src/commands/<name>.ts` with the subcommand's logic as a plain
   exported function and a `register(program, context)` that adds the command
   and writes the result through `context.io`. A failure the user should see
   throws a `CommandError`.
2. Add the module to `subcommands` in `src/commands/index.ts`.
3. Add its tests under `test/`, its entry to the [Usage](usage.md) page, and
   its row to the subcommand table in the repository's `README.md`.
