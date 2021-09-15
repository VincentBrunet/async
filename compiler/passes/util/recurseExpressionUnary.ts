import { AstExpressionUnary } from "../../data/ast/AstExpressionUnary.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionUnary<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionUnary,
) {
  r.recurseExpression(r, p, ast.expression);
}
