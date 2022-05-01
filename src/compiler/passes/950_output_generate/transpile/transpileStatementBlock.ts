import { AstStatementBlock } from '../../../data/ast/AstStatementBlock.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileStatementBlock(
  pass: RecursorPass,
  statementBlock: AstStatementBlock,
  transpiler: Transpiler,
) {
  transpiler.pushStatement([]);
  pass.recurseBlock(statementBlock.block);
}
