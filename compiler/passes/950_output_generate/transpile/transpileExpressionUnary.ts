import {
  AstExpressionUnary,
  AstExpressionUnaryOperator,
} from "../../../data/ast/AstExpressionUnary.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { isTypePrimitive } from "../../../lib/typing/isTypePrimitive.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionUnary(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionUnary,
) {
  // Asserts
  const type = ensure(ast.expression.resolvedType);

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
  pass.recurseExpression(transpiler, ast.expression);
  transpiler.pushPart(")");
}
