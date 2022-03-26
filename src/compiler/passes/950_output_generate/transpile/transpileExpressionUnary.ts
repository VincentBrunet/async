import { AstExpressionUnary, AstExpressionUnaryOperator } from '../../../data/ast/AstExpressionUnary.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { isTypePrimitive } from '../../../lib/typing/isTypePrimitive.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionUnary(
  pass: RecursorPass,
  ast: AstExpressionUnary,
  transpiler: Transpiler,
) {
  // Asserts
  const type = ensure(ast.expression.resolvedType);

  let callName = ast.operator.toString(); // TODO

  if (isTypePrimitive(type, AstTypePrimitiveNative.Integer32)) {
    if (ast.operator === AstExpressionUnaryOperator.Positive) {
      callName = 'i32_positive';
    }
    if (ast.operator === AstExpressionUnaryOperator.Negative) {
      callName = 'i32_negative';
    }
  }

  transpiler.pushStatementPart(callName);
  transpiler.pushStatementPart('(');
  pass.recurseExpression(ast.expression);
  transpiler.pushStatementPart(')');
}
