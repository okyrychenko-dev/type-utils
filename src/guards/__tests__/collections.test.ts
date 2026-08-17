import { describe, expect, it } from "vitest";
import { isArray, isMap, isReadonlyArray, isSet, isWeakMap, isWeakSet } from "../collections";

describe("isArray", () => {
  it("should return true for arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it("should return false for non-arrays", () => {
    expect(isArray({})).toBe(false);
    expect(isArray("array")).toBe(false);
  });
});

describe("isReadonlyArray", () => {
  it("should return true for arrays", () => {
    const readonlyArray: ReadonlyArray<number> = [1, 2, 3];
    expect(isReadonlyArray(readonlyArray)).toBe(true);
  });

  it("should return false for non-arrays", () => {
    expect(isReadonlyArray({})).toBe(false);
  });
});

describe("isMap", () => {
  it("should return true for Map instances", () => {
    expect(isMap(new Map())).toBe(true);
  });

  it("should return false for non-Map values", () => {
    expect(isMap(new Set())).toBe(false);
    expect(isMap({})).toBe(false);
  });
});

describe("isSet", () => {
  it("should return true for Set instances", () => {
    expect(isSet(new Set())).toBe(true);
  });

  it("should return false for non-Set values", () => {
    expect(isSet(new Map())).toBe(false);
    expect(isSet([])).toBe(false);
  });
});

describe("isWeakMap", () => {
  it("should return true for WeakMap instances", () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
  });

  it("should return false for non-WeakMap values", () => {
    expect(isWeakMap(new Map())).toBe(false);
  });
});

describe("isWeakSet", () => {
  it("should return true for WeakSet instances", () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it("should return false for non-WeakSet values", () => {
    expect(isWeakSet(new Set())).toBe(false);
  });
});
