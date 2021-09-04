import { AstStatement } from "../../101_ast/data/AstStatement.ts";
import { OutputBlock } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeVariable } from "./writeVariable.ts";

export function writeStatement(
  module: OutputModule,
  block: OutputBlock,
  astStatement: AstStatement,
) {
  const astVariable = astStatement.variable;
  if (astVariable) {
    writeVariable(module, block, astVariable);
  }
  const astExpression = astStatement.expression;
  if (astExpression) {
    const statement = new OutputStatement();
    writeExpression(module, statement, astExpression);
    block.pushStatement(OutputOrder.Logic, statement);
  }
}
