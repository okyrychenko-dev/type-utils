import { isFunction } from "../guards";
import type { AssertionMessage } from "./assertion-error";

export function toAssertionMessage(message: AssertionMessage): string {
  return isFunction(message) ? message() : message;
}
