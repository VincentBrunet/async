import { AstExpressionBinary } from '../../data/ast/AstExpressionBinary.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionBinary(
  r: RecursorPass,
  ast: AstExpressionBinary,
) {
  r.recurseExpression(ast.expression1);
  r.recurseExpression(ast.expression2);
}
