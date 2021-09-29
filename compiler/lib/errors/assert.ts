import { Ast } from "../../data/ast/Ast.ts";

export function assert<T>(condition?: T, ast?: Ast) {
  if (!condition) {
    throw Error("Assert: " + ast);
  }
}
