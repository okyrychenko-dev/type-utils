export type AssertionMessage = string | (() => string);

export class AssertionError extends TypeError {
  public readonly actual: unknown;
  public readonly cause: unknown;

  public constructor(message: string, actual?: unknown) {
    super(message);

    this.name = "AssertionError";
    this.actual = actual;
    this.cause = actual;
  }
}
