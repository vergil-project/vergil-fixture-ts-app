# Usage

```text
vergil-fixture-ts-app [options] [command]
```

| Command                    | Prints                                 |
| -------------------------- | -------------------------------------- |
| [`greet NAME`](#greet)     | a greeting for `NAME`                  |
| [`sum [NUMBERS...]`](#sum) | the sum of the integers                |
| [`max NUMBERS...`](#max)   | the largest of the integers            |
| [`min NUMBERS...`](#min)   | the smallest of the integers           |
| [`reverse TEXT`](#reverse) | `TEXT` with its characters reversed    |
| [`upper TEXT`](#upper)     | `TEXT` in upper case                   |
| [`info`](#info)            | the program's name and version as JSON |

`--help` (`-h`) prints the commands, and `--version` (`-V`) prints the
program's version. Each command takes `--help` too.

## Exit codes

| Code | Meaning                                                                               |
| ---- | ------------------------------------------------------------------------------------- |
| `0`  | success, `--help` and `--version` included                                            |
| `1`  | a usage error, or the command failed; the reason is on standard error, after `error:` |

With no command, the program prints its usage on standard error and exits
`1`.

## greet

```console
$ vergil-fixture-ts-app greet Ada
Hello, Ada
```

`NAME` is required.

## sum

```console
$ vergil-fixture-ts-app sum 1 2 -4
-1
$ vergil-fixture-ts-app sum
0
```

Each number is a decimal integer with an optional sign, within JavaScript's
safe integer range (±9007199254740991). Anything else is a usage error that
names the value:

```console
$ vergil-fixture-ts-app sum 1 two
error: command-argument value 'two' is invalid for argument 'numbers'. not an integer
```

A sum outside the safe integer range fails rather than print a rounded
result:

```console
$ vergil-fixture-ts-app sum 9007199254740991 1
error: the sum is out of the safe integer range
```

## max

```console
$ vergil-fixture-ts-app max 1 7 -4
7
```

At least one number is required. Each is a decimal integer within the same
safe range as for [`sum`](#sum), and anything else is a usage error that names
the value:

```console
$ vergil-fixture-ts-app max 1 x
error: command-argument value 'x' is invalid for argument 'numbers'. not an integer
```

## min

```console
$ vergil-fixture-ts-app min 1 -4 7
-4
```

At least one number is required. Each is a decimal integer within the same
safe range as for [`sum`](#sum), and anything else is a usage error that names
the value:

```console
$ vergil-fixture-ts-app min x 1
error: command-argument value 'x' is invalid for argument 'numbers'. not an integer
```

## reverse

```console
$ vergil-fixture-ts-app reverse "Ada Lovelace"
ecalevoL adA
```

`TEXT` is required. Each character is a user-perceived character (a grapheme
cluster), so an accented letter written with a combining mark, or an emoji
made of several code points, stays whole.

## upper

```console
$ vergil-fixture-ts-app upper "Ada Lovelace"
ADA LOVELACE
```

`TEXT` is required. It is converted by Unicode's default case mapping, the
same in every locale, so a letter can become more than one: `straße` prints
as `STRASSE`.

## info

```console
$ vergil-fixture-ts-app info
{"name":"vergil-fixture-ts-app","version":"0.1.0"}
```

The name and version are those in the package's `package.json`.
