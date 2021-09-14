import { AstExpressionParenthesis } from "../../../data/ast/expression/AstExpressionParenthesis.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseParenthesis(
  scope: BrowsedScope,
  astParenthesis: AstExpressionParenthesis,
) {
  browseExpression(scope, astParenthesis.expression);
}
