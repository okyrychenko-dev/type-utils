import { describe, expect, it } from "vitest";
import {
  isBigInt,
  isBoolean,
  isDefined,
  isFiniteNumber,
  isNull,
  isNullish,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
} from "../primitives";

describe("isString", () => {
  it("should return true for strings", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
  });

  it("should return false for non-strings", () => {
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });
});

describe("isNumber", () => {
  it("should return true for numbers, including NaN and Infinity", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
  });

  it("should return false for non-numbers", () => {
    expect(isNumber("1")).toBe(false);
    expect(isNumber(null)).toBe(false);
  });
});

describe("isFiniteNumber", () => {
  it("should return true for finite numbers", () => {
    expect(isFiniteNumber(1)).toBe(true);
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-42.5)).toBe(true);
  });

  it("should return false for NaN, Infinity, and non-numbers", () => {
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
    expect(isFiniteNumber("1")).toBe(false);
  });
});

describe("isBoolean", () => {
  it("should return true for booleans", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it("should return false for non-booleans", () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean("true")).toBe(false);
  });
});

describe("isBigInt", () => {
  it("should return true for bigints", () => {
    expect(isBigInt(1n)).toBe(true);
  });

  it("should return false for non-bigints", () => {
    expect(isBigInt(1)).toBe(false);
  });
});

describe("isSymbol", () => {
  it("should return true for symbols", () => {
    expect(isSymbol(Symbol())).toBe(true);
  });

  it("should return false for non-symbols", () => {
    expect(isSymbol("symbol")).toBe(false);
  });
});

describe("isUndefined", () => {
  it("should return true only for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
  });
});

describe("isNull", () => {
  it("should return true only for null", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
  });
});

describe("isNullish", () => {
  it("should return true for null and undefined", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it("should return false for defined values, including falsy ones", () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(false)).toBe(false);
  });
});

describe("isDefined", () => {
  it("should return true for defined values, including falsy ones", () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
    expect(isDefined(false)).toBe(true);
  });

  it("should return false for null and undefined", () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});
