import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionFunction(
  scope: Scope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();

  await next();

  ast.resolvedReturns = scope.getStatementReturns();
}
