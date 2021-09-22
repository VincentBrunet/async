import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionCall<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionCall,
) {
  r.recurseExpression(p, ast.callee);
  for (const param of ast.params) {
    r.recurseExpression(p, param);
  }
}
