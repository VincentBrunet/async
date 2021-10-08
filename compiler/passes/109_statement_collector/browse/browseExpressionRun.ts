import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementExport();
  scope.markCollectorStatementReturn();

  await next();

  ast.resolvedReturns = scope.getStatementReturns();
  assert(scope.getStatementExports().length === 0);
}
