import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementExpression(
  module: OutputModule,
  scope: OutputScope,
  astStatementExpression: AstStatementExpression,
) {
  const statement = new OutputStatement();
  writeExpression(module, scope, statement, astStatementExpression.expression);
  scope.pushStatement(OutputOrder.Logic, statement);
}
