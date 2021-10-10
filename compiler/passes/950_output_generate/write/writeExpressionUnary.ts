import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { isTypePrimitive } from "../../../lib/typing/isTypePrimitive.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionUnary(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionUnary,
) {
  const type = ast.expression.resolvedType;

  let callName = ast.operator.toString(); // TODO

  if (isTypePrimitive(type, AstTypePrimitiveNative.Integer32)) {
    if (ast.operator === AstExpressionUnaryOperator.Positive) {
      callName = "i32_positive";
    }
    if (ast.operator === AstExpressionUnaryOperator.Negative) {
      callName = "i32_negative";
    }
  }

  statement.pushPart(callName);
  statement.pushPart("(");
  writeExpression(module, scope, statement, ast.expression);
  statement.pushPart(")");
}
