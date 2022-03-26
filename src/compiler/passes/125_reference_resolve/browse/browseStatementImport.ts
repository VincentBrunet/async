import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementImport(
  ast: AstStatementImport,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  // All imported slots, for parent scope
  for (const slot of ast.slots) {
    parent.pushStatementImportSlot(slot);
  }
}
