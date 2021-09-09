import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeLookup(
  module: OutputModule,
  statement: OutputStatement,
  astLookup: AstLookup,
) {
  statement.pushPart("object_read(");
  writeExpression(module, statement, astLookup.object);
  statement.pushPart(", ");
  statement.pushPart(astLookup.hash);
  statement.pushPart(")->value");
}
