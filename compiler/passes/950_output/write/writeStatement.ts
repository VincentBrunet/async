import { AstStatement } from "../../101_ast/data/AstStatement.ts";
import { OutputCode } from "../util/OutputCode.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatement(output: OutputCode, astStatement: AstStatement) {
  const astVariable = astStatement.variable;
  if (astVariable) {
    output.writeToSource(
      OutputSection.Module,
      "void *" + astVariable.name + ";",
    );
    if (astVariable.value) {
      output.writeToSource(OutputSection.Module, astVariable.name + "=");
      writeExpression(output, astVariable.value);
      output.writeToSource(OutputSection.Module, ";");
    }
    return;
  }

  const astExpression = astStatement.expression;
  if (astExpression) {
    writeExpression(output, astExpression);
    output.writeToSource(OutputSection.Module, ";");
  }
}
