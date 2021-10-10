import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { hashLocalKey } from "../../../lib/hash/hashLocalKey.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeStatementImport(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementImport,
) {
  const resolvedModule = ensure(ast.resolvedModule);

  module.pushInclude(resolvedModule.meta.meta.cache + "/output.h");

  for (const slot of ast.slots) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *");
    declaration.pushPart(hashLocalKey("import", slot.name));
    declaration.pushPart(" = ");
    declaration.pushPart("module_import");
    declaration.pushPart("(");
    declaration.pushPart(hashAstKey(resolvedModule, resolvedModule, "module"));
    declaration.pushPart(", ");
    declaration.pushPart(ast.slots.indexOf(slot).toString());
    declaration.pushPart(")");
    scope.pushStatement(OutputOrder.Logic, declaration);
  }
}
