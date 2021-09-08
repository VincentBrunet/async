import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { OutputVariable } from "../util/OutputVariable.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeVariable(
  module: OutputModule,
  scope: OutputScope,
  astVariable: AstVariable,
) {
  scope.pushVariable(new OutputVariable(astVariable.name));

  if (astVariable.value) {
    const assignment = new OutputStatement();
    assignment.pushPart("__");
    assignment.pushPart(astVariable.name);
    assignment.pushPart("->value");
    assignment.pushPart(" = ");
    writeExpression(module, assignment, astVariable.value);
    scope.pushStatement(OutputOrder.Logic, assignment);
  }
}
