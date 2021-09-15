import { AstWhile } from "../../data/ast/AstWhile.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseWhile<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstWhile,
) {
  r.recurseExpression(r, p, ast.condition);
  r.recurseBlock(r, p, ast.block);
}
