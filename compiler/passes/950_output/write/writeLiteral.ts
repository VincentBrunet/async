import { AstLiteral, AstLiteralKind } from "../../../data/ast/AstLiteral.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeLiteral(
  _module: OutputModule,
  statement: OutputStatement,
  astLiteral: AstLiteral,
) {
  switch (astLiteral.kind) {
    // Bool
    case AstLiteralKind.Boolean:
      if (astLiteral.data === "false") {
        statement.pushPart("boolean_make(false)");
      } else {
        statement.pushPart("boolean_make(true)");
      }
      break;
    // Null
    case AstLiteralKind.Null:
      statement.pushPart("null_make()");
      break;
    // Number
    case AstLiteralKind.Integer8:
    case AstLiteralKind.Integer16:
    case AstLiteralKind.Integer32:
    case AstLiteralKind.Integer64:
    case AstLiteralKind.Unsigned8:
    case AstLiteralKind.Unsigned16:
    case AstLiteralKind.Unsigned32:
    case AstLiteralKind.Unsigned64:
    case AstLiteralKind.Float32:
    case AstLiteralKind.Float64:
      statement.pushPart("i32_make(");
      statement.pushPart(astLiteral.data);
      statement.pushPart(")");
      break;
  }
}
