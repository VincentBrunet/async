import { astStatementAsVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';

export function browseStatementExport(ast: AstStatementExport) {
  const variable = astStatementAsVariable(ast.statement);
  if (variable) {
    if (variable.mutable) {
      variable.resolvedDynamic = true;
    }
  }
}
