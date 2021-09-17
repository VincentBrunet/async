import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatementWhile<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatementWhile,
) {
  r.recurseExpression(r, p, ast.condition);
  r.recurseBlock(r, p, ast.block);
}
