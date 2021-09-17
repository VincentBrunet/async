import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatementVariable<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatementVariable,
) {
  r.recurseAnnotation(r, p, ast.annotation);
  if (ast.value) {
    r.recurseExpression(r, p, ast.value);
  }
}
