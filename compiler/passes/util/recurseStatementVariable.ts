import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementVariable<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementVariable,
) {
  r.recurseAnnotationType(p, ast.annotation);
  if (ast.value) {
    r.recurseExpression(p, ast.value);
  }
}
