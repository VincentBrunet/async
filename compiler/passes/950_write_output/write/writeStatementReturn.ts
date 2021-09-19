import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementReturn(
  module: OutputModule,
  scope: OutputScope,
  astStatementReturn: AstStatementReturn,
) {
  const statement = new OutputStatement();
  statement.pushPart("return ");
  writeExpression(module, scope, statement, astStatementReturn.expression);
  scope.pushStatement(OutputOrder.Logic, statement);
}
