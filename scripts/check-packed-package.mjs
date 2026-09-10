import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const packageName = "@okyrychenko-dev/type-utils";
const workspace = mkdtempSync(join(tmpdir(), "type-utils-package-check-"));
let tarball = "";

try {
  tarball = execFileSync("npm", ["pack", "--silent", "--ignore-scripts"], {
    encoding: "utf8",
  }).trim();
  if (!tarball.endsWith(".tgz")) {
    throw new TypeError("npm pack did not return a tarball filename.");
  }
  const scopeDirectory = join(workspace, "node_modules", "@okyrychenko-dev");
  mkdirSync(scopeDirectory, { recursive: true });
  execFileSync("tar", ["-xzf", tarball, "-C", workspace]);
  renameSync(join(workspace, "package"), join(scopeDirectory, "type-utils"));

  const typeConsumer = `import {
  hasProperty,
  isArrayOf,
  isFunction,
  isInstanceOf,
  isKeyOf,
  isNonEmptyArray,
  isOneOf,
  isRecordOf,
  isString,
} from "${packageName}";
import type { ElementOf, ValueOf } from "${packageName}";

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends
  (<Value>() => Value extends Right ? 1 : 2) ? true : false;
type Expect<Value extends true> = Value;

interface UserRecord { id: number; name: string }
type ValueContract = Expect<Equal<ValueOf<UserRecord>, number | string>>;
type ElementContract = Expect<Equal<ElementOf<readonly [1, 2]>, 1 | 2>>;

declare const value: unknown;
declare const readonlyValues: ReadonlyArray<unknown>;
declare const key: PropertyKey;

if (isArrayOf(value, isString)) value satisfies Array<string>;
if (isArrayOf(readonlyValues, isString)) {
  readonlyValues satisfies ReadonlyArray<string>;
  // @ts-expect-error Readonly input must remain readonly.
  void readonlyValues.push;
}
if (isRecordOf(value, isString)) value satisfies Record<string, string>;
if (hasProperty(value, "name")) value.name satisfies unknown;
if (isOneOf(value, ["open", "closed"])) value satisfies "open" | "closed";
if (isInstanceOf(value, Date)) value satisfies Date;
if (isNonEmptyArray(value)) value[0] satisfies unknown;
if (isKeyOf({ name: "Ada" }, key)) key satisfies "name";
if (isFunction(value)) {
  // @ts-expect-error Runtime detection does not establish safe arguments.
  value("unsafe");
}
// @ts-expect-error Unknown values cannot be used as arrays before narrowing.
void value.length;
// @ts-expect-error Unknown values cannot expose properties before narrowing.
void value.name;
// @ts-expect-error Arbitrary keys cannot index a known object before narrowing.
void ({ name: "Ada" })[key];
// @ts-expect-error Instance narrowing requires a constructor.
isInstanceOf(value, {});
`;
  writeFileSync(join(workspace, "consumer.mts"), typeConsumer);
  writeFileSync(join(workspace, "consumer.cts"), typeConsumer);

  execFileSync(
    globalThis.process.execPath,
    [
      "--input-type=module",
      "--eval",
      `import { isString } from "${packageName}"; if (!isString("esm")) process.exit(1);`,
    ],
    { cwd: workspace }
  );
  execFileSync(
    globalThis.process.execPath,
    [
      "--input-type=commonjs",
      "--eval",
      `const { isString } = require("${packageName}"); if (!isString("cjs")) process.exit(1);`,
    ],
    { cwd: workspace }
  );
  execFileSync(
    join(globalThis.process.cwd(), "node_modules", ".bin", "tsc"),
    [
      "--noEmit",
      "--strict",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "consumer.mts",
      "consumer.cts",
    ],
    { cwd: workspace }
  );
} finally {
  if (tarball) {
    rmSync(tarball, { force: true });
  }
  rmSync(workspace, { recursive: true, force: true });
}
