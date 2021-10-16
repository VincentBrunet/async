import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { isTypePrimitive } from "../../../lib/typing/isTypePrimitive.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileExpressionUnary(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
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

  transpiler.pushPart(callName);
  transpiler.pushPart("(");
  await pass.recurseExpression(transpiler, ast.expression);
  transpiler.pushPart(")");
}
