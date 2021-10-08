import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeStatementExport(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementExport,
) {
  // TODO
  writeStatement(module, scope, ast.statement);
}
