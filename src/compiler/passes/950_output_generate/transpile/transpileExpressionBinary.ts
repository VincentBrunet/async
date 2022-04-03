import { AstExpressionBinary, AstExpressionBinaryOperator } from '../../../data/ast/AstExpressionBinary.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { isTypePrimitive } from '../../../lib/typing/isTypePrimitive.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionBinary(
  pass: RecursorPass,
  ast: AstExpressionBinary,
  transpiler: Transpiler,
) {
  // Asserts
  const type1 = ensure(ast.expression1.resolvedType);
  const type2 = ensure(ast.expression2.resolvedType);

  if (ast.operator === AstExpressionBinaryOperator.Assign) {
    pass.recurseExpression(ast.expression1);
    transpiler.pushStatementPart(' = ');
    pass.recurseExpression(ast.expression2);
    return;
  }

  //let callName = ast.operator.toString();

  // i32
  /*
  const i32 = AstTypePrimitiveNative.Integer32;
  if (
    isTypePrimitive(type1, i32) &&
    isTypePrimitive(type2, i32)
  ) {
    if (ast.operator === AstExpressionBinaryOperator.Addition) {
      callName = 'i32_addition';
    }
    if (ast.operator === AstExpressionBinaryOperator.Substraction) {
      callName = 'i32_substraction';
    }
    if (ast.operator === AstExpressionBinaryOperator.Multiplication) {
      callName = 'i32_multiplication';
    }
  }
  */

  const operatorToOperator = new Map<AstExpressionBinaryOperator, string>();
  operatorToOperator.set(AstExpressionBinaryOperator.Addition, '+');
  operatorToOperator.set(AstExpressionBinaryOperator.Substraction, '-');
  operatorToOperator.set(AstExpressionBinaryOperator.Multiplication, '*');

  //transpiler.pushStatementPart(callName);
  transpiler.pushStatementPart('(');
  pass.recurseExpression(ast.expression1);
  transpiler.pushStatementPart(' ');
  transpiler.pushStatementPart(operatorToOperator.get(ast.operator) ?? '??');
  transpiler.pushStatementPart(' ');
  pass.recurseExpression(ast.expression2);
  transpiler.pushStatementPart(')');
}
