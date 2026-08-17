# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
  `ArrayElement`, `Mutable`, `Prettify`.
