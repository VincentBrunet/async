import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeVariable(
  scope: ResolveScope,
  astVariable: AstVariable,
) {
  scope.pushVariable(astVariable);
  if (astVariable.value) {
    computeExpression(scope, astVariable.value);
  }
}
