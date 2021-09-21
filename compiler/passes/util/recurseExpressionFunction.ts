import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionFunction<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionFunction,
) {
  r.recurseAnnotationTemplate(r, p, ast.template);
  for (const param of ast.params) {
    r.recurseAnnotationType(r, p, param.annotation);
  }
  r.recurseAnnotationType(r, p, ast.return);
  r.recurseBlock(r, p, ast.block);
}
