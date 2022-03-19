import { AstStatementWhile } from '../../data/ast/AstStatementWhile.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementWhile(r: RecursorPass, ast: AstStatementWhile) {
  r.recurseExpression(ast.condition);
  r.recurseBlock(ast.block);
}
