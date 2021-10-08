import { AstStatementImport } from "../../data/ast/AstStatementImport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementImport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementImport,
) {
  await r.recurseExpression(p, ast.url);
}
