import { AstExpressionUnary } from "../../../data/ast/expression/AstExpressionUnary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseUnary(
  scope: BrowsedScope,
  astUnary: AstExpressionUnary,
) {
  browseExpression(scope, astUnary.expression);
}
