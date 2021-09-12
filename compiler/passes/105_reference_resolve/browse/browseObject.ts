import { AstObject } from "../../../data/ast/AstObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseObject(
  scope: BrowsedScope,
  astObject: AstObject,
) {
  // Asserts
  if (!astObject.closures) {
    throw new Error("Object doesn't have proper closure");
  }

  for (const astClosure of astObject.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new BrowsedScope(scope);

  for (const astClosure of astObject.closures) {
    child.pushClosure(astClosure);
  }

  browseBlock(child, astObject.block);
}
