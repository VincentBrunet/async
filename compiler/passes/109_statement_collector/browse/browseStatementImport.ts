import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementImport(
  scope: BrowsedScope,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateImport(ast);
}
