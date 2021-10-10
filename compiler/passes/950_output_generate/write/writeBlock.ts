import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function writeBlock(
  pass: RecursorPass<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstBlock,
) {
  // Asserts
  const resolvedVariables = ensure(ast.resolvedVariables);
  // Setup local variables
  for (const variable of resolvedVariables) {
    scope.pushStatementPart("t_ref *");
    scope.pushStatementPart("__");
    scope.pushStatementPart(variable.name);
    scope.pushStatementPart(" = ");
    scope.pushStatementPart("ref_make(NULL)");
    scope.pushStatementPart(";");
  }
  // Recurse on statements
  for (const statement of ast.statements) {
    pass.recurseStatement(scope, statement);
  }
}
