import { AstLiteral, AstLiteralType } from "../../101_ast/data/AstLiteral.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeLiteral(
  _module: OutputModule,
  statement: OutputStatement,
  astLiteral: AstLiteral,
) {
  switch (astLiteral.type) {
    // Bool
    case AstLiteralType.Boolean:
      if (astLiteral.value === "false") {
        statement.pushPart("value_false");
      } else {
        statement.pushPart("value_true");
      }
      break;
    // Null
    case AstLiteralType.Null:
      statement.pushPart("value_null");
      break;
    // Number
    default:
      statement.pushPart("value_factory_i32(");
      statement.pushPart(astLiteral.value);
      statement.pushPart(")");
      break;
  }
}
