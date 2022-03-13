import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionParenthesis(
  scope: Scope,
  ast: AstExpressionParenthesis,
  next: () => void,
) {
  next();
  ast.resolvedType = ast.expression.resolvedType;
}
