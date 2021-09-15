import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionFunction<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionFunction,
) {
  r.recurseBlock(r, p, ast.block);
}
