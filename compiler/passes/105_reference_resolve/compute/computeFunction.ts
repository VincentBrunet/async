import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeFunction(
  parent: ResolveScope,
  astFunction: AstFunction,
) {
  if (!astFunction.block) {
    return;
  }
  const scope = new ResolveScope(true, parent);
  for (const astParam of astFunction.params) {
    scope.pushFunctionParam(astParam);
  }
  computeBlock(scope, astFunction.block);
}
