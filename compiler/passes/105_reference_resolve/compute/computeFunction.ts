import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeFunction(
  scope: ResolveScope,
  astFunction: AstFunction,
) {
  // Asserts
  if (!astFunction.closures) {
    throw new Error("Undefined ast function closure");
  }

  for (const astClosure of astFunction.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new ResolveScope(scope);

  for (const astClosure of astFunction.closures) {
    child.pushClosure(astClosure);
  }
  for (const astParam of astFunction.params) {
    child.pushParam(astParam);
  }

  computeBlock(child, astFunction.block);
}
