import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementImport(
  scope: Scope,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  // Asserts
  const parent = ensure(scope.parent);

  for (const slot of ast.slots) {
    if (slot.resolvedStatementTypedef) {
      parent.pushImportSlot(slot);
    }
  }

  for (const slot of ast.slots) {
    if (slot.resolvedStatementVariable) {
      parent.pushImportSlot(slot);
    }
  }

  await next();
}
