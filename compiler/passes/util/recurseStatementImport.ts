import { AstStatementImport } from "../../data/ast/AstStatementImport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementImport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementImport,
) {
  r.recurseExpression(p, ast.url);
}
