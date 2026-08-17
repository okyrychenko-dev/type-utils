import { isUndefined } from "../guards";

export function assertNever(value: never, message?: string): never {
  const prefix = isUndefined(message) ? "" : `${message} `;

  throw new Error(`${prefix}Unexpected value in exhaustive check: ${JSON.stringify(value)}`);
}
