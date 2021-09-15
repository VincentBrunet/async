import { AstExpressionBinary } from "../../data/ast/expression/AstExpressionBinary.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionBinary<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionBinary,
) {
  r.recurseExpression(r, p, ast.expression1);
  r.recurseExpression(r, p, ast.expression2);
}
