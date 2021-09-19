import { AstExpressionTyping } from "../../data/ast/AstExpressionTyping.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionTyping<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionTyping,
) {
  r.recurseExpression(r, p, ast.expression);
  r.recurseType(r, p, ast.type);
}
