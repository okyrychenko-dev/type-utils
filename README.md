# @okyrychenko-dev/type-utils

[![npm version](https://img.shields.io/npm/v/@okyrychenko-dev/type-utils.svg)](https://www.npmjs.com/package/@okyrychenko-dev/type-utils)
[![npm downloads](https://img.shields.io/npm/dm/@okyrychenko-dev/type-utils.svg)](https://www.npmjs.com/package/@okyrychenko-dev/type-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Type-safe guards, assertions, and utility types for narrowing `unknown` values in TypeScript.

## What This Library Does

`type-utils` gives you three composable layers:

- **Guards** — `is*` functions that narrow `unknown` values with type predicates
- **Assertions** — `assert*` functions that narrow in place or throw `AssertionError`
- **Utility types** — small type-level helpers for common value shapes and transformations

It has zero runtime dependencies and ships both ESM and CJS builds. Choose it when you need to
narrow application-boundary values without schemas, parsing, coercion, or transformation; use a
schema library when you need those capabilities.

## Features

- Runtime guards for primitives, collections, objects, functions, and built-ins
- Assertion functions and `assertNever` for safe control-flow narrowing
- Small composable utility types, including `Nullable`, `ValueOf`, and `NonEmptyArray`
- Type predicates and assertion signatures that preserve TypeScript narrowing
- Zero runtime dependencies and dual ESM/CJS builds

## Installation

```bash
npm install @okyrychenko-dev/type-utils
# or
yarn add @okyrychenko-dev/type-utils
# or
pnpm add @okyrychenko-dev/type-utils
```

## Quick Start

```ts
import { assertDefined, isString } from "@okyrychenko-dev/type-utils";

function greet(value: unknown): string {
  if (isString(value)) {
    return `Hello, ${value}!`;
  }

  return "Hello, stranger!";
}

function requireUser(user: User | null | undefined): User {
  assertDefined(user, "User must be loaded before rendering.");

  return user; // narrowed to `User`
}
```

## Guards

### Primitives

```ts
import {
  isBigInt,
  isBoolean,
  isDefined,
  isFiniteNumber,
  isNull,
  isNullish,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
} from "@okyrychenko-dev/type-utils";

isString("hi"); // true
isNumber(NaN); // true — use isFiniteNumber to exclude NaN/Infinity
isFiniteNumber(NaN); // false
isBoolean(true); // true
isBigInt(1n); // true
isSymbol(Symbol()); // true
isUndefined(undefined); // true
isNull(null); // true
isNullish(null); // true — null or undefined
isDefined(0); // true — anything except null/undefined
```

### Collections

```ts
import {
  isArray,
  isMap,
  isReadonlyArray,
  isSet,
  isWeakMap,
  isWeakSet,
} from "@okyrychenko-dev/type-utils";

isArray([1, 2, 3]); // true
isReadonlyArray([1, 2, 3]); // true
isMap(new Map()); // true
isSet(new Set()); // true
isWeakMap(new WeakMap()); // true
isWeakSet(new WeakSet()); // true
```

### Composition

```ts
import {
  hasProperty,
  isArrayOf,
  isInstanceOf,
  isKeyOf,
  isNonEmptyArray,
  isOneOf,
  isRecordOf,
  isString,
} from "@okyrychenko-dev/type-utils";

isArrayOf(["a", "b"], isString); // true, narrows to string[]
isRecordOf({ first: "a" }, isString); // true, narrows record values to string
hasProperty(payload, "items"); // own properties only
isKeyOf(user, key); // narrows key to keyof typeof user
isOneOf(status, ["open", "closed"] as const); // narrows to the literal union
isInstanceOf(value, URL); // narrows to URL
isNonEmptyArray(items); // narrows to a non-empty tuple
```

Composition guards validate values without parsing, coercing, or transforming them.
`hasProperty` considers own properties only, while `isKeyOf` also accepts inherited properties.

### Object and function

```ts
import { isFunction, isObject, isPlainObject } from "@okyrychenko-dev/type-utils";

isObject({}); // true
isObject([]); // true — arrays, Maps, Dates, class instances all pass
isObject(null); // false — null is excluded
isPlainObject({}); // true
isPlainObject([]); // false — not a `{}`/`Object.create(null)` object
isPlainObject(new Map()); // false
isFunction(() => undefined); // true
```

`isFunction` proves only that a value is callable; it does not establish which arguments are safe
to pass. Narrow to a more specific callable type before invoking an unknown function.

### Built-ins

```ts
import { isDate, isError, isPromise, isRegExp } from "@okyrychenko-dev/type-utils";

isDate(new Date()); // true
isRegExp(/abc/); // true
isPromise(Promise.resolve()); // true
isPromise({ then: () => undefined }); // false — thenables are not Promise instances
isError(new TypeError("boom")); // true — subclasses included
```

### Cross-realm behavior

Arrays, dates, regular expressions, maps, sets, weak maps, and weak sets are recognized across
JavaScript realms. Promise and Error recognition also supports common foreign-realm values, but
their runtime tags can be spoofed; these guards are classification helpers, not authenticity or
security checks. Thenables are not treated as promises.

## Assertions

Assertions narrow their argument in place via TypeScript's `asserts` return type, and throw
when the value does not match.

```ts
import {
  assertBoolean,
  assertDefined,
  assertFalse,
  assertNumber,
  assertString,
  assertSymbol,
  assertTrue,
} from "@okyrychenko-dev/type-utils";

assertString(value); // throws TypeError if `value` is not a string
assertNumber(value);
assertBoolean(value);
assertSymbol(value);

assertTrue(items.length > 0, "Expected at least one item.");
assertFalse(isLoading, "Cannot submit while loading.");

assertDefined(user, "User must be defined."); // narrows to NonNullable<T>
```

Every assertion accepts an optional custom message as its last argument; each has a sensible
default. A message may also be a function, which is evaluated only when the assertion fails.
Failures are `AssertionError` instances (and therefore also `TypeError` instances), with the
rejected value available through both `actual` and `cause`.

## Exhaustiveness Checking

`assertNever` throws at runtime and fails the type-check if a `switch`/`if` chain does not
cover every case of a union:

```ts
import { assertNever } from "@okyrychenko-dev/type-utils";

type Status = "idle" | "loading" | "error";

function describe(status: Status): string {
  switch (status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "error":
      return "Error";
    default:
      return assertNever(status); // compile error if a case is added and not handled here
  }
}
```

## Utility Types

```ts
import type { Nullable, Nullish, Optional } from "@okyrychenko-dev/type-utils";

type A = Nullable<string>; // string | null
type B = Optional<string>; // string | undefined
type C = Nullish<string>; // string | null | undefined
```

```ts
import type {
  ElementOf,
  Mutable,
  NonEmptyArray,
  Prettify,
  ValueOf,
} from "@okyrychenko-dev/type-utils";

type Status = { readonly code: 200 | 404 | 500 };

type StatusCode = ValueOf<Status>; // 200 | 404 | 500

type Tags = NonEmptyArray<string>; // [string, ...string[]] — at least one element

type Item = ElementOf<readonly number[]>; // number

type MutableStatus = Mutable<Status>; // { code: 200 | 404 | 500 }

type Flat = Prettify<{ a: string } & { b: number }>; // { a: string; b: number }
```

## API Reference

All public APIs are available from the root package import.

| Area                       | Exports                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Primitive guards           | `isString`, `isNumber`, `isFiniteNumber`, `isBoolean`, `isBigInt`, `isSymbol`, `isUndefined`, `isNull`, `isNullish`, `isDefined`                                   |
| Collection guards          | `isArray`, `isReadonlyArray`, `isMap`, `isSet`, `isWeakMap`, `isWeakSet`                                                                                           |
| Composition guards         | `isArrayOf`, `isRecordOf`, `hasProperty`, `isKeyOf`, `isOneOf`, `isInstanceOf`, `isNonEmptyArray`, `Guard`                                                         |
| Object and built-in guards | `isObject`, `isPlainObject`, `isFunction`, `isDate`, `isRegExp`, `isPromise`, `isError`                                                                            |
| Assertions                 | `AssertionError`, `AssertionMessage`, `assertString`, `assertNumber`, `assertBoolean`, `assertSymbol`, `assertTrue`, `assertFalse`, `assertDefined`, `assertNever` |
| Utility types              | `Nullable`, `Nullish`, `Optional`, `ValueOf`, `NonEmptyArray`, `ElementOf`, `Mutable`, `Prettify`, `Awaitable`                                                     |

## Development

```bash
npm install
npm run typecheck
npm run test:run
npm run build
```

## License

MIT © [Oleksii Kyrychenko](https://github.com/okyrychenko-dev)
