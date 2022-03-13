import { AstStatementReturn } from "../../data/ast/AstStatementReturn.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementReturn<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementReturn,
) {
  r.recurseAnnotationType(p, ast.annotation);
  r.recurseExpression(p, ast.value);
}
