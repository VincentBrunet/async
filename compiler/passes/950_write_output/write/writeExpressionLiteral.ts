import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeExpressionLiteral(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astLiteral: AstExpressionLiteral,
) {
  switch (astLiteral.id) {
    // Bool
    case AstTypePrimitiveId.Boolean:
      if (astLiteral.value === "false") {
        statement.pushPart("boolean_make(FALSE)");
      } else {
        statement.pushPart("boolean_make(TRUE)");
      }
      break;
    // Null
    case AstTypePrimitiveId.Null:
      statement.pushPart("null_make()");
      break;
    // Number
    case AstTypePrimitiveId.Integer8:
    case AstTypePrimitiveId.Integer16:
    case AstTypePrimitiveId.Integer32:
    case AstTypePrimitiveId.Integer64:
    case AstTypePrimitiveId.Unsigned8:
    case AstTypePrimitiveId.Unsigned16:
    case AstTypePrimitiveId.Unsigned32:
    case AstTypePrimitiveId.Unsigned64:
    case AstTypePrimitiveId.Float32:
    case AstTypePrimitiveId.Float64:
      statement.pushPart("i32_make(");
      statement.pushPart(astLiteral.value);
      statement.pushPart(")");
      break;
  }
}
