import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionUnary(
  scope: BrowsedScope,
  ast: AstExpressionUnary,
  next: () => void,
) {
  next();
  if (ast.operator === AstExpressionUnaryOperator.Not) {
    ast.resolvedType = makeTypePrimitive(AstTypePrimitiveId.Boolean, [], ast);
  } else if (ast.operator === AstExpressionUnaryOperator.Negative) {
    ast.resolvedType = makeTypePrimitive(AstTypePrimitiveId.Float32, [], ast);
  } else if (ast.operator === AstExpressionUnaryOperator.Positive) {
    ast.resolvedType = makeTypePrimitive(AstTypePrimitiveId.Float32, [], ast);
  }
}
