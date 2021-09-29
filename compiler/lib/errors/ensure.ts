import { assert } from "https://deno.land/std@0.108.0/_util/assert.ts";
import { Ast } from "../../data/ast/Ast.ts";

export function ensure<T>(condition?: T, ast?: Ast): T {
  assert(condition !== undefined);
  return condition;
}
