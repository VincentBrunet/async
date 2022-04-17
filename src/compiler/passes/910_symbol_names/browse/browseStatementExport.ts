import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseStatementExport(
  astStatementExport: AstStatementExport,
): void {
  const statementVariable = astStatementAsStatementVariable(astStatementExport.statement);
  if (statementVariable) {
    astStatementExport.symbolLocalVariable = hashLocalSymbol('export', statementVariable.name);
  }
}
