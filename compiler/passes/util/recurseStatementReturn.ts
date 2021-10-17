import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementReturn<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementReturn,
) {
  await r.recurseAnnotationType(p, ast.annotation);
  await r.recurseExpression(p, ast.value);
}
