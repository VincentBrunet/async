import { AstExpressionTyping } from "../../../data/ast/AstExpressionTyping.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionTyping(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astTyping: AstExpressionTyping,
) {
  statement.pushPart(astTyping.operator); // TODO
  statement.pushPart("(");
  writeExpression(module, scope, statement, astTyping.expression);
  statement.pushPart("/*");
  statement.pushPart(JSON.stringify(astTyping.type));
  statement.pushPart("*/");
  statement.pushPart(")");
}
