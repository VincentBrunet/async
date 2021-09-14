import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseRun(
  scope: BrowsedScope,
  astRun: AstExpressionRun,
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
