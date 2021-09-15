import { AstExpressionRun } from "../../data/ast/expression/AstExpressionRun.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionRun<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionRun,
) {
  r.recurseBlock(r, p, ast.block);
}
