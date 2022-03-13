import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementExpression<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementExpression,
) {
  r.recurseExpression(p, ast.expression);
}
