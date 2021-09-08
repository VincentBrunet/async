import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeVariable } from "./writeVariable.ts";

export function writeStatement(
  module: OutputModule,
  scope: OutputScope,
  astStatement: AstStatement,
) {
  const astVariable = astStatement.variable;
  if (astVariable) {
    writeVariable(module, scope, astVariable);
  }
  const astExpression = astStatement.expression;
  if (astExpression) {
    const statement = new OutputStatement();
    writeExpression(module, statement, astExpression);
    scope.pushStatement(OutputOrder.Logic, statement);
  }
}
