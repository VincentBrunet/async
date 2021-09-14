import { AstExpressionUnary } from "../../../data/ast/expression/AstExpressionUnary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeUnary(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astUnary: AstExpressionUnary,
) {
  statement.pushPart(astUnary.operator); // TODO
  statement.pushPart("(");
  writeExpression(module, scope, statement, astUnary.expression);
  statement.pushPart(")");
}
