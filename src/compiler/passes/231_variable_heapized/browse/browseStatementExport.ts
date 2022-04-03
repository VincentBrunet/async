import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';

export function browseStatementExport(statementExport: AstStatementExport) {
  const statementVariable = astStatementAsStatementVariable(statementExport.statement);
  if (statementVariable) {
    if (statementVariable.mutable) {
      statementVariable.resolvedHeapized = true;
    }
  }
}
