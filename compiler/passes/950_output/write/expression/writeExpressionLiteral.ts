import {
  AstExpressionLiteral,
  AstExpressionLiteralKind,
} from "../../../../data/ast/expression/AstExpressionLiteral.ts";
import { OutputModule } from "../../util/OutputModule.ts";
import { OutputScope } from "../../util/OutputScope.ts";
import { OutputStatement } from "../../util/OutputStatement.ts";

export function writeExpressionLiteral(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astLiteral: AstExpressionLiteral,
) {
  switch (astLiteral.kind) {
    // Bool
    case AstExpressionLiteralKind.Boolean:
      if (astLiteral.data === "false") {
        statement.pushPart("boolean_make(FALSE)");
      } else {
        statement.pushPart("boolean_make(TRUE)");
      }
      break;
    // Null
    case AstExpressionLiteralKind.Null:
      statement.pushPart("null_make()");
      break;
    // Number
    case AstExpressionLiteralKind.Integer8:
    case AstExpressionLiteralKind.Integer16:
    case AstExpressionLiteralKind.Integer32:
    case AstExpressionLiteralKind.Integer64:
    case AstExpressionLiteralKind.Unsigned8:
    case AstExpressionLiteralKind.Unsigned16:
    case AstExpressionLiteralKind.Unsigned32:
    case AstExpressionLiteralKind.Unsigned64:
    case AstExpressionLiteralKind.Float32:
    case AstExpressionLiteralKind.Float64:
      statement.pushPart("i32_make(");
      statement.pushPart(astLiteral.data);
      statement.pushPart(")");
      break;
  }
}
