import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { ensure } from '../../errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementExport(
  pass: RecursorPass,
  astStatementExport: AstStatementExport,
  transpiler: Transpiler,
) {
  const statementVariable = astStatementAsStatementVariable(astStatementExport.statement);
  pass.recurseStatement(astStatementExport.statement);
  if (statementVariable) {
    transpiler.pushStatement([
      ensure(astStatementExport.symbolLocalVariable),
      ' = ',
      ensure(statementVariable.symbolLocalVariable),
    ]);
  }
}
