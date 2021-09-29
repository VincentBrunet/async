import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionCall<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionCall,
) {
  await r.recurseExpression(p, ast.callee);
  for (const param of ast.params) {
    await r.recurseExpression(p, param);
  }
}
