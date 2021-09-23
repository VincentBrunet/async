import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseTypeFunction<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeFunction,
) {
  for (const param of ast.params) {
    r.recurseType(p, param.type);
  }
  r.recurseType(p, ast.return);
}
