import {
  AstExpressionTyping,
  AstExpressionTypingOperator,
} from "../../../data/ast/AstExpressionTyping.ts";
import { makeTypePrimitiveBoolean } from "../../../lib/typing/makeTypePrimitiveBoolean.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionTyping(
  scope: Scope,
  ast: AstExpressionTyping,
  next: () => void,
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
