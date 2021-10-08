import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementExport(
  scope: BrowsedScope,
  ast: AstStatementExport,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateExport(ast);
}
