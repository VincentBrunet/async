import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementVariable(
  ast: AstStatementVariable,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  // Variable in parent scope
  parent.pushStatementVariable(ast);
}
