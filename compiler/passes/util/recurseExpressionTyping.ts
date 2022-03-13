import { AstExpressionTyping } from "../../data/ast/AstExpressionTyping.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionTyping<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionTyping,
) {
  r.recurseExpression(p, ast.expression);
  r.recurseType(p, ast.type);
}
