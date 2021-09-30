import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementImport(
  scope: BrowsedScope,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  await next();
  for (const slot of ast.slots) {
    scope.parent?.pushImportSlot(slot);
  }
}
