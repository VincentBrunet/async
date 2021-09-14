import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./expression/writeExpression.ts";

export function writeVariable(
  module: OutputModule,
  scope: OutputScope,
  astVariable: AstVariable,
) {
  scope.pushVariable(astVariable);

  if (astVariable.value) {
    const assignment = new OutputStatement();
    assignment.pushPart("__");
    assignment.pushPart(astVariable.name);
    assignment.pushPart("->value");
    assignment.pushPart(" = ");
    writeExpression(module, scope, assignment, astVariable.value);
    scope.pushStatement(OutputOrder.Logic, assignment);
  }
}
