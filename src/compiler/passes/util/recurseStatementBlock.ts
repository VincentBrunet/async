import { AstStatementBlock } from '../../data/ast/AstStatementBlock.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementBlock(r: RecursorPass, ast: AstStatementBlock) {
  r.recurseBlock(ast.block);
}
