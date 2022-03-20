import { assert } from './assert.ts';

export function ensure<T>(needed?: T): T {
  assert(needed !== undefined);
  return needed!;
}
