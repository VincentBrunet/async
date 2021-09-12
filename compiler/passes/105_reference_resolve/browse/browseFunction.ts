import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseFunction(
  scope: BrowsedScope,
  astFunction: AstFunction,
) {
  // Asserts
  if (!astFunction.closures) {
    throw new Error("Undefined ast function closure");
  }

  for (const astClosure of astFunction.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new BrowsedScope(scope);

  for (const astClosure of astFunction.closures) {
    child.pushClosure(astClosure);
  }
  for (const astParam of astFunction.params) {
    child.pushParam(astParam);
  }

  browseBlock(child, astFunction.block);
}
