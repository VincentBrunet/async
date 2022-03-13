import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementImport(
  scope: Scope,
  ast: AstStatementImport,
  next: () => void,
) {
  // Asserts
  const parent = ensure(scope.parent);

  for (const slot of ast.slots) {
    parent.pushImportSlot(slot);
  }

  next();
}
