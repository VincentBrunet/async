import { AstExpressionCall } from "../../data/ast/AstExpressionCall.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionCall<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionCall,
) {
  r.recurseExpression(r, p, ast.callee);
  for (const param of ast.params) {
    r.recurseExpression(r, p, param);
  }
}
