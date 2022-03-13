import { AstTypeParenthesis } from "../../data/ast/AstTypeParenthesis.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseTypeParenthesis<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeParenthesis,
) {
  r.recurseType(p, ast.type);
}
