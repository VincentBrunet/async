import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementImport(
  scope: Scope,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
}
