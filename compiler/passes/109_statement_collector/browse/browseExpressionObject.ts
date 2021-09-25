import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
  ast.resolvedReturns = scope.getStatementReturns();
}
