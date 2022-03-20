import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementVariable(
  next: () => void,
  ast: AstStatementVariable,
  scope: Scope,
) {
  next();
  scope.propagateVariable(ast);
}
