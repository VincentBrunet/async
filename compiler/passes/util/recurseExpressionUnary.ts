import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionUnary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionUnary,
) {
  await r.recurseExpression(p, ast.expression);
}
