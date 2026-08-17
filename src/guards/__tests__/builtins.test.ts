import { describe, expect, it } from "vitest";
import { isDate, isError, isPromise, isRegExp } from "../builtins";

describe("isDate", () => {
  it("should return true for Date instances", () => {
    expect(isDate(new Date())).toBe(true);
  });

  it("should return false for non-Date values", () => {
    expect(isDate("2026-08-17")).toBe(false);
    expect(isDate(Date.now())).toBe(false);
  });
});

describe("isRegExp", () => {
  it("should return true for RegExp instances", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp("abc"))).toBe(true);
  });

  it("should return false for non-RegExp values", () => {
    expect(isRegExp("abc")).toBe(false);
  });
});

describe("isPromise", () => {
  it("should return true for Promise instances", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
  });

  it("should return false for non-Promise values, including thenables", () => {
    expect(isPromise({ then: () => undefined })).toBe(false);
    expect(isPromise(async () => undefined)).toBe(false);
  });
});

describe("isError", () => {
  it("should return true for Error instances, including subclasses", () => {
    expect(isError(new Error("boom"))).toBe(true);
    expect(isError(new TypeError("boom"))).toBe(true);
  });

  it("should return false for non-Error values", () => {
    expect(isError("boom")).toBe(false);
    expect(isError({ message: "boom" })).toBe(false);
  });
});
