import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeExpressionLiteral(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionLiteral,
) {
  switch (ast.native) {
    // Bool
    case AstTypePrimitiveNative.Boolean:
      if (ast.value === "false") {
        statement.pushPart("boolean_make(FALSE)");
      } else {
        statement.pushPart("boolean_make(TRUE)");
      }
      break;
    // Null
    case AstTypePrimitiveNative.Null:
      statement.pushPart("null_make()");
      break;
    // String
    case AstTypePrimitiveNative.String:
      statement.pushPart("str_make(");
      statement.pushPart('"');
      statement.pushPart(ast.value);
      statement.pushPart('"');
      statement.pushPart(")");
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
      statement.pushPart("i32_make(");
      statement.pushPart(ast.value);
      statement.pushPart(")");
      break;
  }
}
