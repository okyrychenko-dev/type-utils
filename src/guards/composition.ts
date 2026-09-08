import { isArray } from "./collections";
import { isObject, isPlainObject } from "./object";

export type Guard<T> = (value: unknown) => value is T;

type ArrayWithSameMutability<V, T> =
  V extends Array<unknown>
    ? Array<T>
    : V extends ReadonlyArray<unknown>
      ? ReadonlyArray<T>
      : Array<T>;

type ArrayOf<V, T> = V & ArrayWithSameMutability<V, T>;

export function isArrayOf<T, V>(value: V, guard: Guard<T>): value is ArrayOf<V, T> {
  return isArray(value) && value.every((item) => guard(item));
}

export function isRecordOf<T>(value: unknown, guard: Guard<T>): value is Record<string, T> {
  return isPlainObject(value) && Object.values(value).every((item) => guard(item));
}

export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, key);
}

export function isKeyOf<T extends object>(value: T, key: PropertyKey): key is keyof T {
  return key in value;
}

export function isOneOf<const T extends ReadonlyArray<unknown>>(
  value: unknown,
  options: T
): value is T[number] {
  return options.includes(value);
}

export function isInstanceOf<T>(
  value: unknown,
  constructor: abstract new (...args: Array<never>) => T
): value is T {
  return value instanceof constructor;
}

export function isNonEmptyArray<T>(value: Array<T>): value is [T, ...Array<T>];
export function isNonEmptyArray<T>(value: ReadonlyArray<T>): value is readonly [T, ...Array<T>];
export function isNonEmptyArray(value: unknown): value is [unknown, ...Array<unknown>];
export function isNonEmptyArray(value: unknown): value is [unknown, ...Array<unknown>] {
  return isArray(value) && value.length > 0;
}
