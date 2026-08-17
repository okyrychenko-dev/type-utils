export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isReadonlyArray(value: unknown): value is ReadonlyArray<unknown> {
  return Array.isArray(value);
}

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}

export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}

export function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
  return value instanceof WeakMap;
}

export function isWeakSet(value: unknown): value is WeakSet<object> {
  return value instanceof WeakSet;
}
