import { AstModule } from '../../../data/ast/AstModule.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';

export function browseStatementExport(
  astStatementExport: AstStatementExport,
  astModule: AstModule,
): void {
  const statementVariable = astStatementAsStatementVariable(astStatementExport.statement);
  if (statementVariable) {
    astStatementExport.symbolLocalValue = astModule.symbolLocalModuleValue + '->' + statementVariable.name;
  }
}
