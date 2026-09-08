import { passesIntrinsicBrandCheck, passesIntrinsicGetterCheck } from "./intrinsic";

export function isDate(value: unknown): value is Date {
  return passesIntrinsicBrandCheck(value, (candidate) => {
    Date.prototype.getTime.call(candidate);
  });
}

export function isRegExp(value: unknown): value is RegExp {
  return passesIntrinsicGetterCheck(RegExp.prototype, "source", value);
}

export function isPromise(value: unknown): value is Promise<unknown> {
  if (value instanceof Promise) {
    return true;
  }

  return Object.prototype.toString.call(value) === "[object Promise]";
}

export function isError(value: unknown): value is Error {
  return value instanceof Error || Object.prototype.toString.call(value) === "[object Error]";
}
