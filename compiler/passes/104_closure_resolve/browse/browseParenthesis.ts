import { AstParenthesis } from "../../../data/ast/AstParenthesis.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseParenthesis(
  scope: BrowsedScope,
  astParenthesis: AstParenthesis,
) {
  browseExpression(scope, astParenthesis.expression);
}
