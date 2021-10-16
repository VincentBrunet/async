import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileExpressionLiteral(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionLiteral,
) {
  switch (ast.native) {
    // Bool
    case AstTypePrimitiveNative.Boolean:
      if (ast.value === "false") {
        transpiler.pushPart("boolean_make(FALSE)");
      } else {
        transpiler.pushPart("boolean_make(TRUE)");
      }
      break;
    // Null
    case AstTypePrimitiveNative.Null:
      transpiler.pushPart("null_make()");
      break;
    // String
    case AstTypePrimitiveNative.String:
      transpiler.pushPart("str_make(");
      transpiler.pushPart('"');
      transpiler.pushPart(ast.value);
      transpiler.pushPart('"');
      transpiler.pushPart(")");
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
      transpiler.pushPart("i32_make(");
      transpiler.pushPart(ast.value);
      transpiler.pushPart(")");
      break;
  }
}
