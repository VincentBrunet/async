import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
  ast.resolvedReturns = scope.getStatementReturns();
}
