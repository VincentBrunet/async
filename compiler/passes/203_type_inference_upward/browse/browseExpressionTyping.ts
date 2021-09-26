import {
  AstExpressionTyping,
  AstExpressionTypingOperator,
} from "../../../data/ast/AstExpressionTyping.ts";
import { makeTypePrimitiveBoolean } from "../../../lib/typing/makeTypePrimitiveBoolean.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionTyping(
  scope: BrowsedScope,
  ast: AstExpressionTyping,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType; // TODO

  if (ast.operator === AstExpressionTypingOperator.Is) {
    ast.resolvedType = makeTypePrimitiveBoolean(ast);
  }
}
