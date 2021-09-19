import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatementReturn<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatementReturn,
) {
  r.recurseExpression(r, p, ast.expression);
}
