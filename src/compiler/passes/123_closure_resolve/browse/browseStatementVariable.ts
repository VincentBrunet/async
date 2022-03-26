import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementVariable(
  next: () => void,
  ast: AstStatementVariable,
  scope: Scope,
) {
  const parent = ensure(scope.parent);
  parent.pushName(ast.name);
  next();
}
