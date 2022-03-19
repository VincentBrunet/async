import { assert } from "./assert.ts";

export function ensure<T>(required?: T): T {
  assert(required);
  return required!;
}
