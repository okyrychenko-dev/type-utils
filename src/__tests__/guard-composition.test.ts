import { describe, expect, expectTypeOf, it } from "vitest";
import {
  hasProperty,
  isArrayOf,
  isInstanceOf,
  isKeyOf,
  isNonEmptyArray,
  isOneOf,
  isRecordOf,
  isString,
} from "../guards";

describe("public guard composition", () => {
  it("should compose collection guards", () => {
    const values: unknown = ["a", "b"];
    const record: unknown = { first: "a", second: "b" };

    expect(isArrayOf(values, isString)).toBe(true);
    expect(isRecordOf(record, isString)).toBe(true);

    if (isArrayOf(values, isString)) {
      expectTypeOf(values).toEqualTypeOf<Array<string>>();
    }

    const readonlyValues: ReadonlyArray<unknown> = ["a"];

    if (isArrayOf(readonlyValues, isString)) {
      expectTypeOf(readonlyValues).toExtend<ReadonlyArray<string>>();
      // @ts-expect-error Readonly inputs must not become mutable after narrowing.
      void readonlyValues.push;
    }
    const unsupported: unknown = {};

    // @ts-expect-error Unknown non-arrays do not expose array members.
    void unsupported.length;

    expect(isRecordOf([], isString)).toBe(false);
  });

  it("should narrow properties, keys, literals, instances, and non-empty arrays", () => {
    const value: unknown = { name: "Ada" };
    const key: PropertyKey = "name";
    const option: unknown = "open";

    expect(hasProperty(value, "name")).toBe(true);

    if (hasProperty(value, "name")) {
      expectTypeOf(value.name).toEqualTypeOf<unknown>();
      expect(isString(value.name)).toBe(true);
    }

    expect(hasProperty({ [Symbol.for("id")]: 1 }, Symbol.for("id"))).toBe(true);
    expect(hasProperty({ 1: "one" }, 1)).toBe(true);
    expect(isKeyOf({ name: "Ada" }, key)).toBe(true);

    if (isKeyOf({ name: "Ada" }, key)) {
      expectTypeOf(key).toEqualTypeOf<"name">();
    }

    class InheritedProperty {
      public inherited(): boolean {
        return true;
      }
    }

    expect(isKeyOf(new InheritedProperty(), "inherited")).toBe(true);
    expect(isOneOf(option, ["open", "closed"])).toBe(true);

    if (isOneOf(option, ["open", "closed"])) {
      expectTypeOf(option).toEqualTypeOf<"open" | "closed">();
    }

    expect(isInstanceOf(new Date(), Date)).toBe(true);

    const instance: unknown = new Date();

    if (isInstanceOf(instance, Date)) {
      expectTypeOf(instance).toEqualTypeOf<Date>();
    }

    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([1, 2])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);

    const unknownItems: unknown = ["a"];

    if (isArrayOf(unknownItems, isString) && isNonEmptyArray(unknownItems)) {
      expectTypeOf(unknownItems[0]).toEqualTypeOf<string>();
    }
  });
});
