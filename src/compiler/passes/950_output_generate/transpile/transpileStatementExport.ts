import { astStatementAsVariable } from '../../../data/ast/AstStatement.ts';
import { AstStatementExport } from '../../../data/ast/AstStatementExport.ts';
import { hashLocalSymbol } from '../../../passes/hash/hashLocalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementExport(
  pass: RecursorPass,
  ast: AstStatementExport,
  transpiler: Transpiler,
) {
  const variable = astStatementAsVariable(ast.statement);
  if (variable) {
    transpiler.pushStatement([
      hashLocalSymbol('export', variable.name),
      ' = ',
      hashLocalSymbol('variable', variable.name),
    ]);
  }

  pass.recurseStatement(ast.statement);
}
