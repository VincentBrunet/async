import { AstCall } from "../../../data/ast/AstCall.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseCall(
  scope: BrowsedScope,
  astCall: AstCall,
) {
  browseExpression(scope, astCall.callee);
  for (const astParam of astCall.params) {
    browseExpression(scope, astParam);
  }
}
