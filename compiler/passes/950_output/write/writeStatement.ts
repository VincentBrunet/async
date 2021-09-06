import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeVariable } from "./writeVariable.ts";

export function writeStatement(
  module: OutputModule,
  func: OutputFunc,
  astStatement: AstStatement,
) {
  const astVariable = astStatement.variable;
  if (astVariable) {
    writeVariable(module, func, astVariable);
  }
  const astExpression = astStatement.expression;
  if (astExpression) {
    const statement = new OutputStatement();
    writeExpression(module, statement, astExpression);
    func.pushStatement(OutputOrder.Logic, statement);
  }
}
