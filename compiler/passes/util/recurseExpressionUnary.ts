import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionUnary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionUnary,
) {
  r.recurseExpression(p, ast.expression);
}
