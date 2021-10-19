import { Ast } from "../../data/ast/Ast.ts";
import { AstType } from "../../data/ast/AstType.ts";
import { makeTypeOr } from "./makeTypeOr.ts";

export function makeTypeOrFromArray(types: Array<AstType>, source?: Ast) {
  let current = types[0];
  for (let i = 1; i < types.length; i++) {
    const next = types[i];
    current = makeTypeOr(current, next, source);
  }
  return current;
}
