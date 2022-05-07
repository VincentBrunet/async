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
  transpiler.pushStatement(['// unsafe start'], false);
  transpiler.pushStatement([ast.content], false);
  transpiler.pushStatement(['// unsafe end'], false);
  transpiler.popBlock();
}
