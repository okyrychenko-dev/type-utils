import { describe, expectTypeOf, it } from "vitest";
import { isFunction } from "../guards";
import type { ElementOf, ValueOf } from "../types";

interface UserRecord {
  id: number;
  name: string;
}

describe("public type contract", () => {
  it("should support interfaces, readonly arrays, and tuples", () => {
    expectTypeOf<ValueOf<UserRecord>>().toEqualTypeOf<number | string>();
    expectTypeOf<ElementOf<readonly [1, 2]>>().toEqualTypeOf<1 | 2>();
  });

  it("should not claim arbitrary arguments are safe after function narrowing", () => {
    const value: unknown = (): void => undefined;
    if (isFunction(value)) {
      expectTypeOf(value).toEqualTypeOf<(...args: Array<never>) => unknown>();
      // @ts-expect-error Runtime function detection cannot establish safe arguments.
      value("unsafe");
    }
  });
});
