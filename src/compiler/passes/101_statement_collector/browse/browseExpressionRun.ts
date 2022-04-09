import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionRun(
  next: () => void,
  ast: AstExpressionRun,
  scope: Scope,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.collectedReturns = scope.getStatementReturns();
}
