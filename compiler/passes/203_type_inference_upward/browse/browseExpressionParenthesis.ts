import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionParenthesis(
  scope: BrowsedScope,
  ast: AstExpressionParenthesis,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression.resolvedType;
}
