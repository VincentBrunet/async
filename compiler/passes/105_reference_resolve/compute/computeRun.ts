import { AstRun } from "../../../data/ast/AstRun.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeRun(
  scope: ResolveScope,
  astRun: AstRun,
) {
  // Asserts
  if (!astRun.closures) {
    throw new Error("Run doesn't have proper closure");
  }

  for (const astClosure of astRun.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new ResolveScope(scope);

  for (const astClosure of astRun.closures) {
    child.pushClosure(astClosure);
  }

  computeBlock(child, astRun.block);
}
