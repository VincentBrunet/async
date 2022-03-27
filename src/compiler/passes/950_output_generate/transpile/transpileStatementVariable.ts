import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementVariable(
  pass: RecursorPass,
  ast: AstStatementVariable,
  transpiler: Transpiler,
) {
  if (ast.value) {
    transpiler.pushStatement([
      ast.mutable ? '*' : '',
      ensure(ast.symbolLocalValue),
      ' = ',
    ]);
    pass.recurseExpression(ast.value);
  }
}
