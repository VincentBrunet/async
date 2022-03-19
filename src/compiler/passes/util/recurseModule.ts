import { AstModule } from '../../data/ast/AstModule.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseModule(r: RecursorPass, ast: AstModule) {
  r.recurseBlock(ast.block);
}
