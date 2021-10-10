import { AstStatementUnsafe } from "../../../data/ast/AstStatementUnsafe.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeStatementUnsafe(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementUnsafe,
) {
  const statement = new OutputStatement();
  statement.pushPart("{");
  statement.pushPart(" ");
  statement.pushPart(ast.content);
  statement.pushPart(" ");
  statement.pushPart("}");
  scope.pushStatement(statement);
}
