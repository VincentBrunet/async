import { AstExpressionParenthesis } from "../../data/ast/expression/AstExpressionParenthesis.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionParenthesis<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionParenthesis,
) {
  r.recurseExpression(r, p, ast.expression);
}
