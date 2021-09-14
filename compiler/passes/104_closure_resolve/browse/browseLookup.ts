import { AstExpressionLookup } from "../../../data/ast/expression/AstExpressionLookup.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseLookup(
  scope: BrowsedScope,
  astLookup: AstExpressionLookup,
) {
  browseExpression(scope, astLookup.expression);
}
