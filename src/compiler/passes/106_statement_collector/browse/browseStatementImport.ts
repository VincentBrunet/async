import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementImport(
  next: () => void,
  ast: AstStatementImport,
  scope: Scope,
) {
  next();
  scope.propagateImport(ast);
}
