import { isBoolean, isNullish, isNumber, isString, isSymbol } from "../guards";
import { AssertionError } from "./assertion-error";
import { toAssertionMessage } from "./assertion-message";
import type { AssertionMessage } from "./assertion-error";

function failAssertion(message: AssertionMessage, actual: unknown): never {
  throw new AssertionError(toAssertionMessage(message), actual);
}

export function assertString(
  value: unknown,
  message: AssertionMessage = "Expected value to be a string."
): asserts value is string {
  if (!isString(value)) {
    failAssertion(message, value);
  }
}

export function assertNumber(
  value: unknown,
  message: AssertionMessage = "Expected value to be a number."
): asserts value is number {
  if (!isNumber(value)) {
    failAssertion(message, value);
  }
}

export function assertBoolean(
  value: unknown,
  message: AssertionMessage = "Expected value to be a boolean."
): asserts value is boolean {
  if (!isBoolean(value)) {
    failAssertion(message, value);
  }
}

export function assertSymbol(
  value: unknown,
  message: AssertionMessage = "Expected value to be a symbol."
): asserts value is symbol {
  if (!isSymbol(value)) {
    failAssertion(message, value);
  }
}

export function assertTrue(
  condition: boolean,
  message: AssertionMessage = "Expected condition to be true."
): asserts condition {
  if (!condition) {
    failAssertion(message, condition);
  }
}

export function assertFalse(
  condition: boolean,
  message: AssertionMessage = "Expected condition to be false."
): asserts condition is false {
  if (condition) {
    failAssertion(message, condition);
  }
}

export function assertDefined<T>(
  value: T,
  message: AssertionMessage = "Expected value to be defined."
): asserts value is NonNullable<T> {
  if (isNullish(value)) {
    failAssertion(message, value);
  }
}
