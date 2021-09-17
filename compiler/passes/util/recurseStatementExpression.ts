import { AstStatementExpression } from "../../data/ast/AstStatementExpression.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatementExpression<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatementExpression,
) {
  r.recurseExpression(r, p, ast.expression);
}
