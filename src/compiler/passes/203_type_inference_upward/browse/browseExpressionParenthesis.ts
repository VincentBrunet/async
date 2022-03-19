import { AstExpressionParenthesis } from '../../../data/ast/AstExpressionParenthesis.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionParenthesis(
  next: () => void,
  ast: AstExpressionParenthesis,
  tracker: Tracker,
) {
  next();
  ast.resolvedType = ast.expression.resolvedType;
}
