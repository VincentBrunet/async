import { AstDo } from "../../../data/ast/AstDo.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeDo(
  scope: ResolveScope,
  astDo: AstDo,
) {
  // Asserts
  if (!astDo.closures) {
    throw new Error("Do doesn't have proper closure");
  }

  for (const astClosure of astDo.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new ResolveScope(scope);

  for (const astClosure of astDo.closures) {
    child.pushClosure(astClosure);
  }

  if (astDo.block) {
    computeBlock(child, astDo.block);
  }
}
