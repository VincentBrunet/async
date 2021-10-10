import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeBlock(
  module: OutputModule,
  scope: OutputScope,
  ast: AstBlock,
) {
  // Setup variables
  const resolvedVariables = ensure(ast.resolvedVariables);
  for (const variable of resolvedVariables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *");
    declaration.pushPart("__");
    declaration.pushPart(variable.name);
    declaration.pushPart(" = ");
    declaration.pushPart("ref_make(NULL)");
    scope.pushStatement(OutputOrder.Logic, declaration);
  }
  // Recurse on statements
  for (const statement of ast.statements) {
    writeStatement(module, scope, statement);
  }
}
