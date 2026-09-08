import { isBigInt, isFunction, isString, isSymbol, isUndefined } from "../guards";
import { AssertionError } from "./assertion-error";
import { toAssertionMessage } from "./assertion-message";
import type { AssertionMessage } from "./assertion-error";

function describeValue(value: unknown): string {
  if (isBigInt(value) || isSymbol(value)) {
    return String(value);
  }

  if (isFunction(value)) {
    return `[Function ${value.name || "anonymous"}]`;
  }

  try {
    const serialized: unknown = JSON.stringify(value);

    return isString(serialized) ? serialized : String(value);
  } catch {
    return Object.prototype.toString.call(value);
  }
}

export function assertNever(value: never, message?: AssertionMessage): never {
  const resolvedMessage = isUndefined(message) ? undefined : toAssertionMessage(message);
  const prefix = resolvedMessage ? `${resolvedMessage} ` : "";

  throw new AssertionError(
    `${prefix}Unexpected value in exhaustive check: ${describeValue(value)}`,
    value
  );
}
