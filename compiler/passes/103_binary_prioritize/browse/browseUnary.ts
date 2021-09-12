import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseUnary(
  scope: BrowsedScope,
  astUnary: AstUnary,
) {
  browseExpression(scope, astUnary.expression);
}
