import vm from "node:vm";
import { describe, expect, it, vi } from "vitest";
import {
  isArray,
  isDate,
  isError,
  isMap,
  isPromise,
  isRegExp,
  isSet,
  isWeakMap,
  isWeakSet,
} from "../guards";

describe("public cross-realm classification", () => {
  it("should recognize supported foreign-realm brands", () => {
    const candidate: unknown = vm.runInNewContext(
      "[new Date(), /x/, Promise.resolve(1), new Error('x'), new Map(), new Set(), new WeakMap(), new WeakSet(), []]"
    );

    expect(isArray(candidate)).toBe(true);

    if (!isArray(candidate)) {
      throw new TypeError("Expected the foreign-realm fixture to be an array.");
    }

    expect(isDate(candidate[0])).toBe(true);
    expect(isRegExp(candidate[1])).toBe(true);
    expect(isPromise(candidate[2])).toBe(true);
    expect(isError(candidate[3])).toBe(true);
    expect(isMap(candidate[4])).toBe(true);
    expect(isSet(candidate[5])).toBe(true);
    expect(isWeakMap(candidate[6])).toBe(true);
    expect(isWeakSet(candidate[7])).toBe(true);
    expect(isArray(candidate[8])).toBe(true);
  });

  it("should reject spoofed brands when intrinsic checks are available", () => {
    expect(isDate({ [Symbol.toStringTag]: "Date" })).toBe(false);
    expect(isMap({ [Symbol.toStringTag]: "Map" })).toBe(false);
  });

  it("should fail closed when a required intrinsic getter is unavailable", () => {
    const descriptor = vi.spyOn(Object, "getOwnPropertyDescriptor").mockReturnValueOnce(undefined);

    expect(isMap(new Map())).toBe(false);

    descriptor.mockRestore();
  });
});
