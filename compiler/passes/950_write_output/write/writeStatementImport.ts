import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeStatementImport(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementImport,
) {
  ast.resolvedModule = ensure(ast.resolvedModule);

  const hash = ast.resolvedModule.meta.meta.hash;

  const localModule = "_module_" + hash;

  const statement = new OutputStatement();
  statement.pushPart("t_value *");
  statement.pushPart(localModule);
  statement.pushPart(" = ");
  statement.pushPart("module_import");
  statement.pushPart("(");
  statement.pushPart(hash);
  statement.pushPart(")");
  scope.pushStatement(OutputOrder.Variables, statement);

  for (const slot of ast.slots) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *");
    declaration.pushPart("_import_");
    declaration.pushPart(slot.name);
    declaration.pushPart(" = ");
    declaration.pushPart("object_read(");
    declaration.pushPart(localModule);
    declaration.pushPart(", ");
    declaration.pushPart(slot.hash);
    declaration.pushPart(")");
    scope.pushStatement(OutputOrder.Variables, declaration);
  }
}
