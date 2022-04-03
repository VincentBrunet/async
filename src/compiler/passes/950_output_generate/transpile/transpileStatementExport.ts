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
  pass.recurseStatement(astStatementExport.statement);
  const variable = astStatementAsStatementVariable(astStatementExport.statement);
  if (variable) {
    transpiler.pushStatement([
      ensure(astStatementExport.symbolLocalValue),
      ' = ',
      ensure(variable.symbolLocalValue),
    ]);
  }
}
