import { describe, expect, it } from "vitest";
import { assertNever } from "../exhaustive";

describe("assertNever", () => {
  it("should throw with the value serialized in the message", () => {
    expect(() => assertNever("unexpected" as never)).toThrow(
      'Unexpected value in exhaustive check: "unexpected"'
    );
  });

  it("should prefix the message when one is provided", () => {
    expect(() => assertNever("unexpected" as never, "describe:")).toThrow(
      'describe: Unexpected value in exhaustive check: "unexpected"'
    );
  });
});
