import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionObject<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionObject,
) {
  r.recurseAnnotationType(r, p, ast.annotation);
  r.recurseBlock(r, p, ast.block);
}
