import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementVariable(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementVariable,
) {
  const declaration = new OutputStatement();
  declaration.pushPart("t_ref *");
  declaration.pushPart("__");
  declaration.pushPart(ast.name);
  declaration.pushPart(" = ");
  declaration.pushPart("ref_make(NULL)");
  scope.pushStatement(OutputOrder.Variables, declaration);

  if (ast.value) {
    const assignment = new OutputStatement();
    assignment.pushPart("__");
    assignment.pushPart(ast.name);
    assignment.pushPart("->value");
    assignment.pushPart(" = ");
    writeExpression(module, scope, assignment, ast.value);
    scope.pushStatement(OutputOrder.Logic, assignment);
  }
}
