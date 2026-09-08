export function isFunction(value: unknown): value is (...args: Array<never>) => unknown {
  return typeof value === "function";
}
