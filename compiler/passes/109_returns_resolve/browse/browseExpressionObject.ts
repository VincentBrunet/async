import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => void,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedReturns = scope.getStatementReturns();
}
