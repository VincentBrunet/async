import { AstStatementVariable } from "../../data/ast/AstStatementVariable.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementVariable<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementVariable,
) {
  await r.recurseAnnotationType(p, ast.annotation);
  if (ast.value) {
    await r.recurseExpression(p, ast.value);
  }
}
