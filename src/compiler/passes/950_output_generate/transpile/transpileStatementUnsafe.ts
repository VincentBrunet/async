import { AstStatementUnsafe } from '../../../data/ast/AstStatementUnsafe.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementUnsafe(
  _: RecursorPass,
  ast: AstStatementUnsafe,
  transpiler: Transpiler,
) {
  transpiler.pushStatement(['/* unsafe */ ']);
  transpiler.pushBlock();
  transpiler.pushStatement(['// start']);
  transpiler.pushStatement([ast.content]);
  transpiler.pushStatement(['// end']);
  transpiler.popBlock();
}
