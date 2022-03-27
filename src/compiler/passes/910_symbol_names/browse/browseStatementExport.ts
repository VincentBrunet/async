import { astStatementAsVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseStatementExport(
  astStatementExport: AstStatementExport,
): void {
  const statementVariable = astStatementAsVariable(astStatementExport.statement);
  if (statementVariable) {
    astStatementExport.symbolLocalValue = hashLocalSymbol('export', statementVariable.name);
  }
}
