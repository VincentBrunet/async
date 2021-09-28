import {
  AstExpressionBinary,
  AstExpressionBinaryOperator,
} from "../../../data/ast/AstExpressionBinary.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { isTypePrimitive } from "../../../lib/typing/isTypePrimitive.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionBinary(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionBinary,
) {
  if (ast.operator === AstExpressionBinaryOperator.Assign) {
    writeExpression(module, scope, statement, ast.expression1);
    statement.pushPart(" = ");
    writeExpression(module, scope, statement, ast.expression2);
    return;
  }

  const type1 = ast.expression1.resolvedType;
  const type2 = ast.expression2.resolvedType;

  let callName = ast.operator.toString();

  // i32
  const i32id = AstTypePrimitiveId.Integer32;
  if (
    isTypePrimitive(type1, i32id) &&
    isTypePrimitive(type2, i32id)
  ) {
    if (ast.operator === AstExpressionBinaryOperator.Addition) {
      callName = "i32_addition";
    }
    if (ast.operator === AstExpressionBinaryOperator.Substraction) {
      callName = "i32_substraction";
    }
    if (ast.operator === AstExpressionBinaryOperator.Multiplication) {
      callName = "i32_multiplication";
    }
  }

  statement.pushPart(callName);
  statement.pushPart("(");
  writeExpression(module, scope, statement, ast.expression1);
  statement.pushPart(", ");
  writeExpression(module, scope, statement, ast.expression2);
  statement.pushPart(")");
}
