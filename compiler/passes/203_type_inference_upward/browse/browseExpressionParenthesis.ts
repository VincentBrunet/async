import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionParenthesis(
  scope: BrowsedScope,
  ast: AstExpressionParenthesis,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType;
}
