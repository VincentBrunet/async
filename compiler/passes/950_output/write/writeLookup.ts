import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeLookup(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astLookup: AstLookup,
) {
  statement.pushPart("object_read(");
  writeExpression(module, scope, statement, astLookup.expression);
  statement.pushPart(", ");
  statement.pushPart(astLookup.hash);
  statement.pushPart(")->value");
}
