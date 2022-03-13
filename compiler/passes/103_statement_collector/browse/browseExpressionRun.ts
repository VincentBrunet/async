import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => void,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedReturns = scope.getStatementReturns();
}
