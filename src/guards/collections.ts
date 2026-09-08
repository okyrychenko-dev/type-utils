import { passesIntrinsicBrandCheck, passesIntrinsicGetterCheck } from "./intrinsic";

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isReadonlyArray(value: unknown): value is ReadonlyArray<unknown> {
  return Array.isArray(value);
}

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return passesIntrinsicGetterCheck(Map.prototype, "size", value);
}

export function isSet(value: unknown): value is Set<unknown> {
  return passesIntrinsicGetterCheck(Set.prototype, "size", value);
}

export function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
  return passesIntrinsicBrandCheck(value, (candidate) => {
    WeakMap.prototype.has.call(candidate, {});
  });
}

export function isWeakSet(value: unknown): value is WeakSet<object> {
  return passesIntrinsicBrandCheck(value, (candidate) => {
    WeakSet.prototype.has.call(candidate, {});
  });
}
