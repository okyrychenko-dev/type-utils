import { describe, expect, it } from "vitest";
import {
  assertBoolean,
  assertDefined,
  assertFalse,
  assertNumber,
  assertString,
  assertSymbol,
  assertTrue,
} from "../assertions";

describe("assertString", () => {
  it("should not throw for strings", () => {
    expect(() => assertString("hello")).not.toThrow();
  });

  it("should throw a TypeError with the default message for non-strings", () => {
    expect(() => assertString(1)).toThrow(TypeError);
    expect(() => assertString(1)).toThrow("Expected value to be a string.");
  });

  it("should throw with a custom message", () => {
    expect(() => assertString(1, "custom")).toThrow("custom");
  });
});

describe("assertNumber", () => {
  it("should not throw for numbers", () => {
    expect(() => assertNumber(1)).not.toThrow();
  });

  it("should throw a TypeError for non-numbers", () => {
    expect(() => assertNumber("1")).toThrow(TypeError);
    expect(() => assertNumber("1")).toThrow("Expected value to be a number.");
  });
});

describe("assertBoolean", () => {
  it("should not throw for booleans", () => {
    expect(() => assertBoolean(true)).not.toThrow();
  });

  it("should throw a TypeError for non-booleans", () => {
    expect(() => assertBoolean(1)).toThrow(TypeError);
    expect(() => assertBoolean(1)).toThrow("Expected value to be a boolean.");
  });
});

describe("assertSymbol", () => {
  it("should not throw for symbols", () => {
    expect(() => assertSymbol(Symbol())).not.toThrow();
  });

  it("should throw a TypeError for non-symbols", () => {
    expect(() => assertSymbol("symbol")).toThrow(TypeError);
    expect(() => assertSymbol("symbol")).toThrow("Expected value to be a symbol.");
  });
});

describe("assertTrue", () => {
  it("should not throw when the condition is true", () => {
    expect(() => assertTrue(true)).not.toThrow();
  });

  it("should throw an Error with the default message when the condition is false", () => {
    expect(() => assertTrue(false)).toThrow("Expected condition to be true.");
  });

  it("should throw with a custom message", () => {
    expect(() => assertTrue(false, "custom")).toThrow("custom");
  });
});

describe("assertFalse", () => {
  it("should not throw when the condition is false", () => {
    expect(() => assertFalse(false)).not.toThrow();
  });

  it("should throw an Error with the default message when the condition is true", () => {
    expect(() => assertFalse(true)).toThrow("Expected condition to be false.");
  });
});

describe("assertDefined", () => {
  it("should not throw for defined values, including falsy ones", () => {
    expect(() => assertDefined(0)).not.toThrow();
    expect(() => assertDefined("")).not.toThrow();
    expect(() => assertDefined(false)).not.toThrow();
  });

  it("should throw an Error with the default message for null or undefined", () => {
    expect(() => assertDefined(null)).toThrow("Expected value to be defined.");
    expect(() => assertDefined(undefined)).toThrow("Expected value to be defined.");
  });

  it("should throw with a custom message", () => {
    expect(() => assertDefined(null, "custom")).toThrow("custom");
  });
});
