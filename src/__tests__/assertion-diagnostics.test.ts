import { describe, expect, it, vi } from "vitest";
import { AssertionError, assertNever, assertString } from "../assertions";
import type { AssertionMessage } from "../assertions";

function callAssertNever(value: unknown, message?: AssertionMessage): never {
  // @ts-expect-error This test helper deliberately exercises the runtime fallback.
  return assertNever(value, message);
}

function captureError(action: () => void): unknown {
  try {
    action();
  } catch (error: unknown) {
    return error;
  }

  throw new Error("Expected action to throw.");
}

describe("public assertion diagnostics", () => {
  it("should preserve assertion failures for hostile values", () => {
    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;

    expect(() => callAssertNever(1n)).toThrow("1");
    expect(() => callAssertNever(Symbol("x"))).toThrow("Symbol(x)");
    expect(() => callAssertNever(undefined)).toThrow("undefined");
    expect(() =>
      callAssertNever(function named() {
        return undefined;
      })
    ).toThrow("[Function named]");
    expect(() => callAssertNever(() => undefined)).toThrow("[Function anonymous]");
    expect(() => callAssertNever(cyclic)).toThrow("[object Object]");

    expect(() => callAssertNever({ reason: "unknown" }, "Invalid state")).toThrow(
      'Invalid state Unexpected value in exhaustive check: {"reason":"unknown"}'
    );
    expect(() => callAssertNever(undefined, "")).toThrow(
      "Unexpected value in exhaustive check: undefined"
    );
    expect(() => callAssertNever(null, () => "Lazy state")).toThrow(
      "Lazy state Unexpected value in exhaustive check: null"
    );
  });

  it("should resolve lazy messages only when an assertion fails", () => {
    const message = vi.fn(() => "lazy message");

    assertString("valid", message);

    expect(message).not.toHaveBeenCalled();
    expect(() => assertString(1, message)).toThrow("lazy message");
    expect(message).toHaveBeenCalledOnce();
  });

  it("should expose identifiable assertion failure context", () => {
    const actual = { invalid: true };
    const error = captureError(() => assertString(actual));

    expect(error).toBeInstanceOf(AssertionError);
    expect(error).toBeInstanceOf(TypeError);

    if (!(error instanceof AssertionError)) {
      throw new Error("Expected the public AssertionError.");
    }

    expect(error.actual).toBe(actual);
    expect(error.cause).toBe(actual);
  });
});
