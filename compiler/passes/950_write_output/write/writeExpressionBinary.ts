import {
  AstExpressionBinary,
  AstExpressionBinaryOperator,
} from "../../../data/ast/AstExpressionBinary.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionBinary(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionBinary,
) {
  if (ast.operator === AstExpressionBinaryOperator.Assign) {
    writeExpression(module, scope, statement, ast.expression1);
    statement.pushPart(" = ");
    writeExpression(module, scope, statement, ast.expression2);
  } else {
    statement.pushPart(ast.operator); // TODO
    statement.pushPart("(");
    writeExpression(module, scope, statement, ast.expression1);
    statement.pushPart(", ");
    writeExpression(module, scope, statement, ast.expression2);
    statement.pushPart(")");
  }
}
