import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { makeTypePrimitiveBoolean } from "../../../lib/typing/makeTypePrimitiveBoolean.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionUnary(
  scope: Scope,
  ast: AstExpressionUnary,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType; // TODO

  if (ast.operator === AstExpressionUnaryOperator.Not) {
    ast.resolvedType = makeTypePrimitiveBoolean(ast);
  } else if (ast.operator === AstExpressionUnaryOperator.Negative) {
    //ast.resolvedType = makeTypePrimitive(AstTypePrimitiveNative.Float32, [], ast);
  } else if (ast.operator === AstExpressionUnaryOperator.Positive) {
    //ast.resolvedType = makeTypePrimitive(AstTypePrimitiveNative.Float32, [], ast);
  }
}
