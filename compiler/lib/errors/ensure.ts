import { Ast } from "../../data/ast/Ast.ts";
import { assert } from "./assert.ts";

export function ensure<T>(condition?: T, ast?: Ast): T {
  assert(condition, ast);
  return condition!;
}
