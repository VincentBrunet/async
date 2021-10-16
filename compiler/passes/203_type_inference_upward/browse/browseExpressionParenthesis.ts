import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionParenthesis(
  scope: Scope,
  ast: AstExpressionParenthesis,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression.resolvedType;
}
