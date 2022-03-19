import { AstTypeParenthesis } from '../../data/ast/AstTypeParenthesis.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeParenthesis(r: RecursorPass, ast: AstTypeParenthesis) {
  r.recurseType(ast.type);
}
