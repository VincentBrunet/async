import { AstStatementExport } from "../../data/ast/AstStatementExport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementExport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementExport,
) {
  r.recurseStatement(p, ast.statement);
}
