# Usage

```text
vergil-fixture-ts-app [options] [command]
```

| Command                            | Prints                                    |
| ---------------------------------- | ----------------------------------------- |
| [`greet NAME`](#greet)             | a greeting for `NAME`                     |
| [`sum [NUMBERS...]`](#sum)         | the sum of the integers                   |
| [`product [NUMBERS...]`](#product) | the product of the integers               |
| [`max NUMBERS...`](#max)           | the largest of the integers               |
| [`min NUMBERS...`](#min)           | the smallest of the integers              |
| [`reverse TEXT`](#reverse)         | `TEXT` with its characters reversed       |
| [`length TEXT`](#length)           | the number of characters in `TEXT`        |
| [`words TEXT`](#words)             | the number of words in `TEXT`             |
| [`upper TEXT`](#upper)             | `TEXT` in upper case                      |
| [`lower TEXT`](#lower)             | `TEXT` in lower case                      |
| [`capitalize TEXT`](#capitalize)   | `TEXT` with an upper-case first character |
| [`trim TEXT`](#trim)               | `TEXT` without surrounding whitespace     |
| [`squeeze TEXT`](#squeeze)         | `TEXT` with its whitespace collapsed      |
| [`palindrome TEXT`](#palindrome)   | `true` if `TEXT` reads the same reversed  |
| [`info`](#info)                    | the program's name and version as JSON    |

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

## product

```console
$ vergil-fixture-ts-app product 2 3 -4
-24
$ vergil-fixture-ts-app product
1
```

Each number is read as for [`sum`](#sum): a decimal integer with an optional
sign, within JavaScript's safe integer range (±9007199254740991). Anything else
is a usage error that names the value:

```console
$ vergil-fixture-ts-app product 2 x
error: command-argument value 'x' is invalid for argument 'numbers'. not an integer
```

A product outside the safe integer range fails rather than print a rounded
result:

```console
$ vergil-fixture-ts-app product 9007199254740991 2
error: the product is out of the safe integer range
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

## length

```console
$ vergil-fixture-ts-app length "Ada Lovelace"
12
```

`TEXT` is required. Characters are counted as for [`reverse`](#reverse): each
is a user-perceived character (a grapheme cluster), so an accented letter
written with a combining mark, or an emoji made of several code points,
counts as one.

## words

```console
$ vergil-fixture-ts-app words "Ada Lovelace, 1815!"
3
```

`TEXT` is required. Words are found by Unicode's default word boundaries: a
number counts as a word, spaces and punctuation do not, and an apostrophe
inside a word keeps it whole, so `don't` counts as one.

## upper

```console
$ vergil-fixture-ts-app upper "Ada Lovelace"
ADA LOVELACE
```

`TEXT` is required. It is converted by Unicode's default case mapping, the
same in every locale, so a letter can become more than one: `straße` prints
as `STRASSE`.

## lower

```console
$ vergil-fixture-ts-app lower "Ada Lovelace"
ada lovelace
```

`TEXT` is required. It is converted by Unicode's default case mapping, the
same in every locale, so a capital sigma that ends a word takes the final
form: `ΟΔΟΣ` prints as `οδος`.

## capitalize

```console
$ vergil-fixture-ts-app capitalize "ada lovelace"
Ada lovelace
```

`TEXT` is required. Its first character, counted as for
[`reverse`](#reverse), is converted to upper case as for [`upper`](#upper),
so a leading `ß` prints as `SS`. The rest of the text is kept as it is.

## trim

```console
$ vergil-fixture-ts-app trim "  Ada Lovelace  "
Ada Lovelace
```

`TEXT` is required. Its leading and trailing whitespace is dropped: spaces,
tabs, line breaks and the other Unicode spaces, such as a no-break space.
Whitespace inside the text is kept as it is.

## squeeze

```console
$ vergil-fixture-ts-app squeeze "  Ada   Lovelace  "
Ada Lovelace
```

`TEXT` is required. Each run of whitespace inside it becomes one space, and
its leading and trailing whitespace is dropped. Whitespace is the same as for
`trim`: spaces, tabs, line breaks and the other Unicode spaces.

## palindrome

```console
$ vergil-fixture-ts-app palindrome level
true
$ vergil-fixture-ts-app palindrome "Ada Lovelace"
false
```

`TEXT` is required. It is a palindrome when it reads the same with its
characters reversed, characters counted as for [`reverse`](#reverse). The
comparison is exact: case, spaces and punctuation all count, so `Level` is
not a palindrome. Empty text and a single character are.

## info

```console
$ vergil-fixture-ts-app info
{"name":"vergil-fixture-ts-app","version":"0.1.0"}
```

The name and version are those in the package's `package.json`.
