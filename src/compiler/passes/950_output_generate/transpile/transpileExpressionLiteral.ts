import { AstExpressionLiteral } from '../../../data/ast/AstExpressionLiteral.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { never } from '../../errors/never.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';

export function transpileExpressionLiteral(
  pass: RecursorPass,
  astExpressionLiteral: AstExpressionLiteral,
  transpiler: Transpiler,
) {
  switch (astExpressionLiteral.native) {
    // Bool
    case AstTypePrimitiveNative.Boolean:
      if (astExpressionLiteral.value === 'false') {
        transpiler.pushStatementPart('false');
      } else {
        transpiler.pushStatementPart('true');
      }
      return;
    // nothing
    case AstTypePrimitiveNative.Nothing:
      transpiler.pushStatementPart('ac::nothing_make()');
      return;
    // String
    case AstTypePrimitiveNative.String:
      transpiler.pushStatementPart('ac::string_make(');
      transpiler.pushStatementPart('"');
      transpiler.pushStatementPart(astExpressionLiteral.value);
      transpiler.pushStatementPart('"');
      transpiler.pushStatementPart(')');
      return;
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
      //transpiler.pushStatementPart('i32_make(');
      transpiler.pushStatementPart(astExpressionLiteral.value);
      //transpiler.pushStatementPart(')');
      return;
  }
}
