import { AstExpressionParenthesis } from '../../data/ast/AstExpressionParenthesis.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionParenthesis(r: RecursorPass, ast: AstExpressionParenthesis) {
  r.recurseExpression(ast.expression);
}
