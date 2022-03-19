import { assert } from "./assert.ts";

export function never(): never {
  throw assert(!false);
}
