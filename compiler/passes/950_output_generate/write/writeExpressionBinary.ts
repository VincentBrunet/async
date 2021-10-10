import {
  AstExpressionBinary,
  AstExpressionBinaryOperator,
} from "../../../data/ast/AstExpressionBinary.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { isTypePrimitive } from "../../../lib/typing/isTypePrimitive.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function writeExpressionBinary(
  pass: RecursorPass<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionBinary,
) {
  if (ast.operator === AstExpressionBinaryOperator.Assign) {
    pass.recurseExpression(scope, ast.expression1);
    scope.pushStatementPart(" = ");
    pass.recurseExpression(scope, ast.expression2);
    return;
  }

  const type1 = ast.expression1.resolvedType;
  const type2 = ast.expression2.resolvedType;

  let callName = ast.operator.toString();

  // i32
  const i32 = AstTypePrimitiveNative.Integer32;
  if (
    isTypePrimitive(type1, i32) &&
    isTypePrimitive(type2, i32)
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

  scope.pushStatementPart(callName);
  scope.pushStatementPart("(");
  pass.recurseExpression(scope, ast.expression1);
  scope.pushStatementPart(", ");
  pass.recurseExpression(scope, ast.expression2);
  scope.pushStatementPart(")");
}
