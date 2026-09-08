export type Nullable<T> = T | null;

export type Nullish<T> = T | null | undefined;

export type Optional<T> = T | undefined;

export type ValueOf<T> = T[keyof T];

export type NonEmptyArray<T> = [T, ...Array<T>];

export type ElementOf<T extends ReadonlyArray<unknown>> = T[number];

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Awaitable<T> = T | Promise<T>;
