import { AstExpressionTyping } from "../../data/ast/AstExpressionTyping.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionTyping<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionTyping,
) {
  await r.recurseExpression(p, ast.expression);
  await r.recurseType(p, ast.type);
}
