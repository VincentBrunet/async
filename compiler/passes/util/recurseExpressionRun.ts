import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionRun<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionRun,
) {
  r.recurseAnnotationType(r, p, ast.annotation);
  r.recurseBlock(r, p, ast.block);
}
