import { AstStatementReturn } from '../../../data/ast/AstStatementReturn.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementReturn(
  pass: RecursorPass,
  astStatementReturn: AstStatementReturn,
  transpiler: Transpiler,
) {
  transpiler.pushStatement(['return', ' ']);
  pass.recurseExpression(astStatementReturn.value);
}
