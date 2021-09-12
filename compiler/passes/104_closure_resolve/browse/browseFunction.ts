import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseFunction(
  scope: BrowsedScope,
  astFunction: AstFunction,
) {
  const child = new BrowsedScope(scope);
  for (const astParam of astFunction.params) {
    child.pushName(astParam.name);
  }
  browseBlock(child, astFunction.block);
  astFunction.closures = child.readClosures();
}
