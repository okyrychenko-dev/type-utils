import { isBoolean, isNullish, isNumber, isString, isSymbol } from "../guards";

export function assertString(
  value: unknown,
  message = "Expected value to be a string."
): asserts value is string {
  if (!isString(value)) {
    throw new TypeError(message);
  }
}

export function assertNumber(
  value: unknown,
  message = "Expected value to be a number."
): asserts value is number {
  if (!isNumber(value)) {
    throw new TypeError(message);
  }
}

export function assertBoolean(
  value: unknown,
  message = "Expected value to be a boolean."
): asserts value is boolean {
  if (!isBoolean(value)) {
    throw new TypeError(message);
  }
}

export function assertSymbol(
  value: unknown,
  message = "Expected value to be a symbol."
): asserts value is symbol {
  if (!isSymbol(value)) {
    throw new TypeError(message);
  }
}

export function assertTrue(
  condition: boolean,
  message = "Expected condition to be true."
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertFalse(
  condition: boolean,
  message = "Expected condition to be false."
): asserts condition is false {
  if (condition) {
    throw new Error(message);
  }
}

export function assertDefined<T>(
  value: T,
  message = "Expected value to be defined."
): asserts value is NonNullable<T> {
  if (isNullish(value)) {
    throw new Error(message);
  }
}
