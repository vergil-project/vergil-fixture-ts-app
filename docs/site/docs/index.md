# vergil-fixture-ts-app

This is a Vergil test fixture. It has no users.

It holds a small TypeScript command-line application so that Vergil's support
for TypeScript applications runs against a real one: local validation with
`vrg-validate`, the build, CI, the dependency and license audit, this docs
site and the tagged release. Each fixture run adds one small increment to the
program and drives it through Vergil's full cycle, from change to release.

Why the fixture exists, and how a fixture run works, is set out in the
[spec of epic vergil-project/.github#1091](https://github.com/vergil-project/.github/blob/develop/epics/1091-language-fixture-repos/spec.md).
The TypeScript fixtures came with
[epic vergil-project/.github#1174](https://github.com/vergil-project/.github/blob/develop/epics/1174-ts-full-cycle/spec.md).

## What it exercises

- `vrg-validate`'s TypeScript checks: the required devDependencies at their
  accepted majors, Prettier and ESLint on Vergil's managed configs, `tsc`,
  Vitest at 100% line coverage, `npm audit` and the license summary, and the
  BUILD check, which compiles the program to `dist/`.
- Two real runtime dependencies, `commander` and `zod`, for the audit and the
  dependency tooling to work on.
- The fleet's CI and CD workflows, this site and the release.

Nothing it builds is published to a package registry.

## Next

- [Getting Started](getting-started.md): build and run it.
- [Usage](usage.md): its subcommands.
