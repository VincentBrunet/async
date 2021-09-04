import { AstVariable } from "../../101_ast/data/AstVariable.ts";
import { OutputBlock } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeVariable(
  module: OutputModule,
  block: OutputBlock,
  astVariable: AstVariable,
) {
  const declaration = new OutputStatement();
  declaration.pushPart("t_variable *");
  declaration.pushPart(astVariable.name);
  block.pushStatement(OutputOrder.Variables, declaration);

  if (astVariable.value) {
    const assignment = new OutputStatement();
    assignment.pushPart(astVariable.name);
    assignment.pushPart(" = ");
    writeExpression(module, assignment, astVariable.value);
    block.pushStatement(OutputOrder.Logic, assignment);
  }
}
