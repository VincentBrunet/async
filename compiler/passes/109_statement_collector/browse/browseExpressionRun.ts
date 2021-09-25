import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
  ast.resolvedReturns = scope.getStatementReturns();
}
