import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseLookup(
  scope: BrowsedScope,
  astLookup: AstLookup,
) {
  browseExpression(scope, astLookup.expression);
}
