import { AstExpressionLiteral } from '../../../data/ast/AstExpressionLiteral.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionLiteral(
  pass: RecursorPass,
  ast: AstExpressionLiteral,
  transpiler: Transpiler,
) {
  switch (ast.native) {
    // Bool
    case AstTypePrimitiveNative.Boolean:
      if (ast.value === 'false') {
        transpiler.pushStatementPart('boolean_make(FALSE)');
      } else {
        transpiler.pushStatementPart('boolean_make(TRUE)');
      }
      break;
    // Null
    case AstTypePrimitiveNative.Null:
      transpiler.pushStatementPart('null_make()');
      break;
    // String
    case AstTypePrimitiveNative.String:
      transpiler.pushStatementPart('str_make(');
      transpiler.pushStatementPart('"');
      transpiler.pushStatementPart(ast.value);
      transpiler.pushStatementPart('"');
      transpiler.pushStatementPart(')');
      break;
    // Number
    case AstTypePrimitiveNative.Integer8:
    case AstTypePrimitiveNative.Integer16:
    case AstTypePrimitiveNative.Integer32:
    case AstTypePrimitiveNative.Integer64:
    case AstTypePrimitiveNative.Unsigned8:
    case AstTypePrimitiveNative.Unsigned16:
    case AstTypePrimitiveNative.Unsigned32:
    case AstTypePrimitiveNative.Unsigned64:
    case AstTypePrimitiveNative.Float32:
    case AstTypePrimitiveNative.Float64:
      transpiler.pushStatementPart('i32_make(');
      transpiler.pushStatementPart(ast.value);
      transpiler.pushStatementPart(')');
      break;
  }
}
