import { AstStatementExport } from "../../data/ast/AstStatementExport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementExport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementExport,
) {
  await r.recurseStatement(p, ast.statement);
}
