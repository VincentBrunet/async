import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementExport();
  scope.markCollectorStatementReturn();

  await next();

  ast.resolvedReturns = scope.getStatementReturns();
  assert(scope.getStatementExports().length === 0);
}
