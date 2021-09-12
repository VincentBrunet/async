import { AstParenthesis } from "../../../data/ast/AstParenthesis.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeParenthesis(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astParenthesis: AstParenthesis,
) {
  statement.pushPart("(");
  writeExpression(module, scope, statement, astParenthesis.expression);
  statement.pushPart(")");
}
