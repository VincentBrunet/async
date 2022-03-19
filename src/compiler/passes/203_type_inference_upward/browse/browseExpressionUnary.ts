import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { makeTypePrimitiveBoolean } from "../../../lib/typing/makeTypePrimitiveBoolean.ts";
import { Tracker } from "../util/Tracker.ts";

export function browseExpressionUnary(
  next: () => void,
  ast: AstExpressionUnary,
  tracker: Tracker,
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
