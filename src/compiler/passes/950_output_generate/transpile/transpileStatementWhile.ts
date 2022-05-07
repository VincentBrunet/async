import { AstStatementWhile } from '../../../data/ast/AstStatementWhile.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementWhile(
  pass: RecursorPass,
  ast: AstStatementWhile,
  transpiler: Transpiler,
) {
  // condition
  transpiler.pushStatement(['while (TO_BOOLEAN('], false);
  pass.recurseExpression(ast.condition);
  transpiler.pushStatementPart('))');
  // content
  pass.recurseBlock(ast.block);
}
