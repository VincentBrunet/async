import { AstExpressionLookup } from "../../../../data/ast/expression/AstExpressionLookup.ts";
import { OutputModule } from "../../util/OutputModule.ts";
import { OutputScope } from "../../util/OutputScope.ts";
import { OutputStatement } from "../../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionLookup(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astLookup: AstExpressionLookup,
) {
  statement.pushPart("object_read(");
  writeExpression(module, scope, statement, astLookup.expression);
  statement.pushPart(", ");
  statement.pushPart(astLookup.hash);
  statement.pushPart(")->value");
}
