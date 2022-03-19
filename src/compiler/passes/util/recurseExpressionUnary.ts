import { AstExpressionUnary } from '../../data/ast/AstExpressionUnary.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionUnary(r: RecursorPass, ast: AstExpressionUnary) {
  r.recurseExpression(ast.expression);
}
