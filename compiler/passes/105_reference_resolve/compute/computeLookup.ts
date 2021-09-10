import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeLookup(
  scope: ResolveScope,
  astLookup: AstLookup,
) {
  computeExpression(scope, astLookup.expression);
}
