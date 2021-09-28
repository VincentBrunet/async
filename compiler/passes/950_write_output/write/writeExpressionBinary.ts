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

  let callName = ast.operator.toString();

  if (ast.operator === AstExpressionBinaryOperator.Addition) {
    const i32id = AstTypePrimitiveId.Integer32;
    if (
      isTypePrimitive(ast.expression1.resolvedType, i32id) &&
      isTypePrimitive(ast.expression2.resolvedType, i32id)
    ) {
      callName = "i32_add";
    }
  }

  statement.pushPart(callName);
  statement.pushPart("(");
  writeExpression(module, scope, statement, ast.expression1);
  statement.pushPart(", ");
  writeExpression(module, scope, statement, ast.expression2);
  statement.pushPart(")");
}
