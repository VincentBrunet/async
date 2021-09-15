import { AstExpressionObject } from "../../data/ast/expression/AstExpressionObject.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionObject<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionObject,
) {
  r.recurseBlock(r, p, ast.block);
}
