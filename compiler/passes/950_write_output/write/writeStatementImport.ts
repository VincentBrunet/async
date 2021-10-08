import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementImport(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementImport,
) {
  const statement = new OutputStatement();
  statement.pushPart("import");
  statement.pushPart("(");
  //statement.pushPart('"');
  writeExpression(module, scope, statement, ast.url);
  //statement.pushPart('"');
  statement.pushPart(")");
  scope.pushStatement(OutputOrder.Variables, statement);
}
