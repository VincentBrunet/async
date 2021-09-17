import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionFunction<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionFunction,
) {
  for (const param of ast.params) {
    r.recurseAnnotation(r, p, param.annotation);
  }
  r.recurseAnnotation(r, p, ast.return);
  r.recurseBlock(r, p, ast.block);
}
