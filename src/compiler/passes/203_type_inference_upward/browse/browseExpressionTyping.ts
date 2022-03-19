import { AstExpressionTyping, AstExpressionTypingOperator } from '../../../data/ast/AstExpressionTyping.ts';
import { makeTypePrimitiveBoolean } from '../../../lib/typing/makeTypePrimitiveBoolean.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionTyping(
  next: () => void,
  ast: AstExpressionTyping,
  tracker: Tracker,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType; // TODO

  if (ast.operator === AstExpressionTypingOperator.Is) {
    ast.resolvedType = makeTypePrimitiveBoolean(ast);
  }
  if (ast.operator === AstExpressionTypingOperator.As) {
    ast.resolvedType = ast.type;
  }
}
