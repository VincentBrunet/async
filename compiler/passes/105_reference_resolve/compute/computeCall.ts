import { AstCall } from "../../../data/ast/AstCall.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeCall(
  scope: ResolveScope,
  astCall: AstCall,
) {
  computeExpression(scope, astCall.callee);
  for (const astParam of astCall.params) {
    computeExpression(scope, astParam);
  }
}
