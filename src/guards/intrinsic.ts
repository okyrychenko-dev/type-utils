import { isUndefined } from "./primitives";

export function passesIntrinsicBrandCheck(
  value: unknown,
  probeBrand: (value: unknown) => void
): boolean {
  try {
    probeBrand(value);
    return true;
  } catch {
    return false;
  }
}

export function passesIntrinsicGetterCheck(
  prototype: object,
  property: PropertyKey,
  value: unknown
): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(prototype, property);

  if (isUndefined(descriptor) || typeof descriptor.get !== "function") {
    return false;
  }

  return passesIntrinsicBrandCheck(value, (candidate) => {
    descriptor.get?.call(candidate);
  });
}
