import { AstExpressionCall } from "../../../data/ast/expression/AstExpressionCall.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseCall(
  scope: BrowsedScope,
  astCall: AstExpressionCall,
) {
  browseExpression(scope, astCall.callee);
  for (const astParam of astCall.params) {
    browseExpression(scope, astParam);
  }
}
