import { describe, expect, it } from "vitest";
import { isFunction } from "../functions";

describe("isFunction", () => {
  it("should return true for functions", () => {
    expect(isFunction(() => undefined)).toBe(true);
    expect(
      isFunction(function named() {
        return undefined;
      })
    ).toBe(true);
  });

  it("should return false for non-functions", () => {
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction("function")).toBe(false);
  });
});
