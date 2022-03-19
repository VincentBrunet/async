import { AstExpressionTyping } from '../../data/ast/AstExpressionTyping.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionTyping(r: RecursorPass, ast: AstExpressionTyping) {
  r.recurseExpression(ast.expression);
  r.recurseType(ast.type);
}
