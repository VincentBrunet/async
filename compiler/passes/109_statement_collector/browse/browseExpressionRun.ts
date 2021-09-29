import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();
  await next();
  ast.resolvedReturns = scope.getStatementReturns();
}
