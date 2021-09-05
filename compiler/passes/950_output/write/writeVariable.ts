import { AstVariable } from "../../101_ast/data/AstVariable.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { OutputVariable } from "../util/OutputVariable.ts";
import { writeExpression } from "./writeExpression.ts";
import { writeIdentifier } from "./writeIdentifier.ts";

export function writeVariable(
  module: OutputModule,
  func: OutputFunc,
  astVariable: AstVariable,
) {
  func.pushVariable(new OutputVariable(astVariable.name));

  if (astVariable.value) {
    const assignment = new OutputStatement();
    writeIdentifier(module, assignment, {
      name: astVariable.name, // TODO
    });
    assignment.pushPart(" = ");
    writeExpression(module, assignment, astVariable.value);
    func.pushStatement(OutputOrder.Logic, assignment);
  }
}
