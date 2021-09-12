import { AstObject } from "../../../data/ast/AstObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseObject(
  scope: BrowsedScope,
  astObject: AstObject,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astObject.block);
  astObject.closures = child.readClosures();
}
