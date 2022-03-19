import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementImport(
  next: () => void,
  ast: AstStatementImport,
  scope: Scope,
) {
  next();
  const parent = ensure(scope.parent);
  for (const slot of ast.slots) {
    parent.pushName(slot.name);
  }
}
