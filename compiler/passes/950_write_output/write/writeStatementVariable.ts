import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementVariable(
  module: OutputModule,
  scope: OutputScope,
  astVariable: AstStatementVariable,
) {
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
