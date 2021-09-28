import { AstExpressionImport } from "../../../data/ast/AstExpressionImport.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeExpressionImport(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionImport,
) {
  statement.pushPart("import");
  statement.pushPart("(");
  statement.pushPart('"');
  statement.pushPart(ast.url);
  statement.pushPart('"');
  statement.pushPart(")");
}
