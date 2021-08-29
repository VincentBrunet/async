import { AstStatement } from "../../101_ast/data/AstStatement.ts";
import { OutputCode } from "../util/OutputCode.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatement(output: OutputCode, astStatement: AstStatement) {
  output.addContent("  ");

  const astVariable = astStatement.variable;
  if (astVariable) {
    output.addVariable(astVariable.name);
    if (astVariable.value) {
      output.addContent(astVariable.name);
      output.addContent(" = ");
      writeExpression(output, astVariable.value);
    }
  }

  const astExpression = astStatement.expression;
  if (astExpression) {
    writeExpression(output, astExpression);
  }

  output.addContent(";\n");
}
