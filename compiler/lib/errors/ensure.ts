import { Ast } from "../../data/ast/Ast.ts";

export function ensure<T>(condition?: T, ast?: Ast): T {
  if (condition === undefined) {
    throw Error("Assert");
  }
  return condition;
}
