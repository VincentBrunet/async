import { AstExpressionImport } from "../../../data/ast/AstExpressionImport.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeExpressionImport(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionImport,
) {
  statement.pushPart("import");
  statement.pushPart("(");
  //statement.pushPart('"');
  writeExpression(module, scope, statement, ast.expression);
  //statement.pushPart('"');
  statement.pushPart(")");
}
