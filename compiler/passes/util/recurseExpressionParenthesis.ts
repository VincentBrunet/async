import { AstExpressionParenthesis } from "../../data/ast/AstExpressionParenthesis.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionParenthesis<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionParenthesis,
) {
  r.recurseExpression(p, ast.expression);
}
