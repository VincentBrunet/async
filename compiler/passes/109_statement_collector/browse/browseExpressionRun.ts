import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();

  await next();

  ast.resolvedReturns = scope.getStatementReturns();
}
