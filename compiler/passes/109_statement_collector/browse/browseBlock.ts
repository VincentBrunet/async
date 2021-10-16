import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { Scope } from "../util/Scope.ts";

export async function browseBlock(
  scope: Scope,
  ast: AstBlock,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementExport();
  scope.markCollectorStatementVariable();

  await next();

  assert(scope.getStatementExports().length === 0);
  ast.resolvedVariables = scope.getStatementVariables();
}
