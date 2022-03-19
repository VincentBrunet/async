import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpression(
  next: () => void,
  ast: AstExpression,
  tracker: Tracker,
) {
  next();
  ast.resolvedType = ast.data.resolvedType;
}
