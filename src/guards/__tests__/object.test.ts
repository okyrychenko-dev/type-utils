import { describe, expect, it } from "vitest";
import { isObject, isPlainObject } from "../object";

describe("isObject", () => {
  it("should return true for objects, arrays, and other object-typeof values", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Map())).toBe(true);
  });

  it("should return false for null and primitives", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject("object")).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe("isPlainObject", () => {
  it("should return true for object literals and Object.create(null)", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("should return false for arrays, class instances, and built-ins", () => {
    class Point {
      x = 0;
    }

    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Point())).toBe(false);
  });

  it("should return false for null and primitives", () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject("object")).toBe(false);
  });
});
