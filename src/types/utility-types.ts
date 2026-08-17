export type Nullable<T> = T | null;

export type Nullish<T> = T | null | undefined;

export type Optional<T> = T | undefined;

export type ValueOf<T extends Record<PropertyKey, unknown>> = T[keyof T];

export type NonEmptyArray<T> = [T, ...Array<T>];

export type ArrayElement<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer U> ? U : never;

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type Prettify<T> = { [K in keyof T]: T[K] } & {};
