import { AstExpressionParenthesis } from "../../data/ast/AstExpressionParenthesis.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionParenthesis<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionParenthesis,
) {
  await r.recurseExpression(p, ast.expression);
}
