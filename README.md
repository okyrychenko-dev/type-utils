# @okyrychenko-dev/type-utils

[![npm version](https://img.shields.io/npm/v/@okyrychenko-dev/type-utils.svg)](https://www.npmjs.com/package/@okyrychenko-dev/type-utils)
[![npm downloads](https://img.shields.io/npm/dm/@okyrychenko-dev/type-utils.svg)](https://www.npmjs.com/package/@okyrychenko-dev/type-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Type-safe guards, assertions, and utility types for narrowing `unknown` values in TypeScript.

## What This Library Does

`type-utils` gives you three composable layers:

- **Guards** — `is*` functions that narrow `unknown` values with a type predicate
- **Assertions** — `assert*` functions that narrow in place or throw a `TypeError`/`Error`
- **Utility types** — small type-level helpers (`Nullable`, `Nullish`, `Optional`)

It has zero runtime dependencies and ships both ESM and CJS builds.

## Installation

```bash
npm install @okyrychenko-dev/type-utils
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
isReadonlyArray([1, 2, 3] as const); // true
isMap(new Map()); // true
isSet(new Set()); // true
isWeakMap(new WeakMap()); // true
isWeakSet(new WeakSet()); // true
```

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

### Built-ins

```ts
import { isDate, isError, isPromise, isRegExp } from "@okyrychenko-dev/type-utils";

isDate(new Date()); // true
isRegExp(/abc/); // true
isPromise(Promise.resolve()); // true
isPromise({ then: () => undefined }); // false — thenables are not Promise instances
isError(new TypeError("boom")); // true — subclasses included
```

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
default.

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
  ArrayElement,
  Mutable,
  NonEmptyArray,
  Prettify,
  ValueOf,
} from "@okyrychenko-dev/type-utils";

type Status = { readonly code: 200 | 404 | 500 };
type StatusCode = ValueOf<Status>; // 200 | 404 | 500

type Tags = NonEmptyArray<string>; // [string, ...string[]] — at least one element

type Item = ArrayElement<readonly number[]>; // number

type MutableStatus = Mutable<Status>; // { code: 200 | 404 | 500 }

type Flat = Prettify<{ a: string } & { b: number }>; // { a: string; b: number }
```

## Development

```bash
npm install
npm run typecheck
npm run test:run
npm run build
```

## License

MIT © [Oleksii Kyrychenko](https://github.com/okyrychenko-dev)
