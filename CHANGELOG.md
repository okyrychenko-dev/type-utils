# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-09-12

### Added

- Added composable guards for arrays, records, properties, object keys, literal choices,
  constructor instances, and non-empty arrays.
- Added `AssertionError`, lazy assertion messages, rejected-value diagnostics, and resilient
  `assertNever` output.
- Added packed-package verification for ESM, CommonJS, and TypeScript consumers.
- Added automated package checks with Are the Types Wrong and `publint`.

### Changed

- Corrected `ValueOf` and `ElementOf` behavior for ordinary interfaces, readonly arrays, and
  tuples.
- Made `isFunction` narrow unknown values to a callable type without claiming safe arguments.
- Made built-in and collection guards recognize supported cross-realm values.
- Defined separate ESM and CommonJS export conditions and declaration files.
- Expanded CI coverage to every supported Node.js version and made the release workflow verify
  the generated package before publishing.

## [0.1.1] - 2026-08-23

### Changed

- Aligned the README and release verification scripts with the other published
  `@okyrychenko-dev/*` packages.

## [0.1.0] - 2026-08-17

### Added

- Primitive type guards: `isString`, `isNumber`, `isFiniteNumber`, `isBoolean`,
  `isBigInt`, `isSymbol`, `isUndefined`, `isNull`, `isNullish`, `isDefined`.
- Collection type guards: `isArray`, `isReadonlyArray`, `isMap`, `isSet`,
  `isWeakMap`, `isWeakSet`.
- Object and function type guards: `isObject`, `isPlainObject`, `isFunction`.
- Built-in type guards: `isDate`, `isRegExp`, `isPromise`, `isError`.
- Assertions: `assertString`, `assertNumber`, `assertBoolean`, `assertSymbol`,
  `assertTrue`, `assertFalse`, `assertDefined`.
- Exhaustiveness checking via `assertNever`.
- Utility types: `Nullable`, `Nullish`, `Optional`, `ValueOf`, `NonEmptyArray`,
  `ElementOf`, `Mutable`, `Prettify`.
