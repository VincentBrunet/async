import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeFunction(
  scope: ResolveScope,
  astFunction: AstFunction,
) {
  for (const astClosure of astFunction.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }
  const child = new ResolveScope(parent);
  for (const astClosure of astFunction.closures) {
    child.pushClosure(astClosure);
  }
  for (const astParam of astFunction.params) {
    child.pushParam(astParam);
  }
  if (astFunction.block) {
    computeBlock(child, astFunction.block);
  }
}
