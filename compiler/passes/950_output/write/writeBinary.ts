import { AstExpressionBinary } from "../../../data/ast/expression/AstExpressionBinary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeBinary(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astBinary: AstExpressionBinary,
) {
  statement.pushPart(astBinary.operator); // TODO
  statement.pushPart("(");
  writeExpression(module, scope, statement, astBinary.expression1);
  statement.pushPart(", ");
  writeExpression(module, scope, statement, astBinary.expression2);
  statement.pushPart(")");
}
