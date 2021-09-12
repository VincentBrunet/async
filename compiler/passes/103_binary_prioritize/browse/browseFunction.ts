import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseFunction(
  scope: BrowsedScope,
  astFunction: AstFunction,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astFunction.block);
}
