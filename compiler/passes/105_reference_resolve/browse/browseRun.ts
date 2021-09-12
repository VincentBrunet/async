import { AstRun } from "../../../data/ast/AstRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseRun(
  scope: BrowsedScope,
  astRun: AstRun,
) {
  // Asserts
  if (!astRun.closures) {
    throw new Error("Run doesn't have proper closure");
  }

  for (const astClosure of astRun.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new BrowsedScope(scope);

  for (const astClosure of astRun.closures) {
    child.pushClosure(astClosure);
  }

  browseBlock(child, astRun.block);
}
