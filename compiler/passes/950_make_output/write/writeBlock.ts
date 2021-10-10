import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeBlock(
  pass: RecursorPass<BrowsedScope>,
  scope: BrowsedScope,
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
    scope.pushStatement(declaration);
  }
  // Recurse on statements
  for (const statement of ast.statements) {
    pass.recurseStatement(scope, statement);
  }
}
