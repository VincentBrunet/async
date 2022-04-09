import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  next: () => void,
  ast: AstExpressionFunction,
  scope: Scope,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.collectedReturns = scope.getStatementReturns();
}
