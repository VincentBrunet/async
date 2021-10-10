import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseBlock(
  scope: BrowsedScope,
  ast: AstBlock,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementExport();
  scope.markCollectorStatementVariable();

  await next();

  assert(scope.getStatementExports().length === 0);
  ast.resolvedVariables = scope.getStatementVariables();
}
