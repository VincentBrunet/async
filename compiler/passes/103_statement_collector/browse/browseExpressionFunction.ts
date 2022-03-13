import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionFunction(
  scope: Scope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedReturns = scope.getStatementReturns();
}
