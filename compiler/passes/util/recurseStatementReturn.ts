import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementReturn<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementReturn,
) {
  await r.recurseExpression(p, ast.expression);
}
