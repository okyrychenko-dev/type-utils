import { describe, expect, it } from "vitest";
import { assertNever } from "../exhaustive";
import type { AssertionMessage } from "../assertion-error";

function callAssertNever(value: unknown, message?: AssertionMessage): never {
  // @ts-expect-error This test helper deliberately exercises the runtime fallback.
  return assertNever(value, message);
}

describe("assertNever", () => {
  it("should throw with the value serialized in the message", () => {
    expect(() => callAssertNever("unexpected")).toThrow(
      'Unexpected value in exhaustive check: "unexpected"'
    );
  });

  it("should prefix the message when one is provided", () => {
    expect(() => callAssertNever("unexpected", "describe:")).toThrow(
      'describe: Unexpected value in exhaustive check: "unexpected"'
    );
  });
});
