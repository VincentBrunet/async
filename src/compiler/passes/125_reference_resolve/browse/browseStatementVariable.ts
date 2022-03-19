import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementVariable(
  next: () => void,
  ast: AstStatementVariable,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  parent.pushVariable(ast);

  next();
}
