import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionLookup<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionLookup,
) {
  r.recurseExpression(r, p, ast.expression);
}
