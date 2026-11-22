# vergil-fixture-ts-app

This repository is a Vergil test fixture. It has no users. It holds a small,
real TypeScript command-line application so that Vergil's support for
TypeScript applications has something real to run against: local validation,
CI, the dependency and license audit, the build, the docs site and the
release. It is one of the language fixture repos that epic
[vergil-project/.github#1091](https://github.com/vergil-project/.github/issues/1091)
describes in its
[spec](https://github.com/vergil-project/.github/blob/develop/epics/1091-language-fixture-repos/spec.md);
epic [vergil-project/.github#1174](https://github.com/vergil-project/.github/issues/1174)
added the TypeScript fixtures.

## Table of Contents

- [Status](#status)
- [Overview](#overview)
- [Getting Started](#getting-started)
- [License](#license)

## Status

A test fixture. Its program changes only through fixture runs, each of which
adds one small increment.

## Overview

The program, `vergil-fixture-ts-app`, has ten subcommands:

| Command            | Prints                                 |
| ------------------ | -------------------------------------- |
| `greet NAME`       | `Hello, NAME`                          |
| `sum [NUMBERS...]` | the sum of the integers, `0` for none  |
| `max NUMBERS...`   | the largest of the integers            |
| `min NUMBERS...`   | the smallest of the integers           |
| `reverse TEXT`     | `TEXT` with its characters reversed    |
| `length TEXT`      | the number of characters in `TEXT`     |
| `words TEXT`       | the number of words in `TEXT`          |
| `upper TEXT`       | `TEXT` in upper case                   |
| `lower TEXT`       | `TEXT` in lower case                   |
| `info`             | the program's name and version as JSON |

It exercises:

- `vrg-validate`'s TypeScript checks: the required devDependencies at their
  accepted majors, Prettier and ESLint on Vergil's managed configs, `tsc`,
  Vitest at 100% line coverage, `npm audit` and the license summary, and the
  BUILD check, which runs `npm run build` to compile the program to `dist/`;
- two real runtime dependencies, `commander` and `zod`, for the audit and the
  dependency tooling to work on;
- the fleet's CI and CD workflows, the docs site and the tagged release.

Nothing it builds is published to a package registry (`"private": true` in
`package.json`).

## Getting Started

See the [documentation](https://vergil-project.github.io/vergil-fixture-ts-app/).

## License

MIT — see [LICENSE](LICENSE).
