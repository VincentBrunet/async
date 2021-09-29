import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementExpression<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementExpression,
) {
  await r.recurseExpression(p, ast.expression);
}
