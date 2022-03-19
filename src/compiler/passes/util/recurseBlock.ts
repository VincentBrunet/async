import { AstBlock } from '../../data/ast/AstBlock.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseBlock(r: RecursorPass, ast: AstBlock) {
  for (const statement of ast.statements) {
    r.recurseStatement(statement);
  }
}
