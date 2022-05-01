import { AstStatementUnsafe } from '../../../data/ast/AstStatementUnsafe.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementUnsafe(
  _: RecursorPass,
  ast: AstStatementUnsafe,
  transpiler: Transpiler,
) {
  transpiler.pushStatement([]);
  transpiler.pushBlock();
  transpiler.pushStatement(['// unsafe start']);
  transpiler.pushStatement([ast.content]);
  transpiler.pushStatement(['// unsafe end']);
  transpiler.popBlock();
}
