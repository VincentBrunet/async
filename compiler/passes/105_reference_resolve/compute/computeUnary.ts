import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeUnary(
  scope: ResolveScope,
  astUnary: AstUnary,
) {
  computeExpression(scope, astUnary.expression);
}
