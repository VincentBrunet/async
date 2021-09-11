import { AstObject } from "../../../data/ast/AstObject.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeObject(
  scope: ResolveScope,
  astObject: AstObject,
) {
  // Asserts
  if (!astObject.closures) {
    throw new Error("Object doesn't have proper closure");
  }

  for (const astClosure of astObject.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new ResolveScope(scope);

  for (const astClosure of astObject.closures) {
    child.pushClosure(astClosure);
  }

  computeBlock(child, astObject.block);
}
