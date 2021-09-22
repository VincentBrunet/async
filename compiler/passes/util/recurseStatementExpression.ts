import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";

export function recurseStatementExpression<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementExpression,
) {
  r.recurseExpression(p, ast.expression);
}
