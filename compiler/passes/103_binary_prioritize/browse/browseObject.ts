import { AstExpressionObject } from "../../../data/ast/expression/AstExpressionObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseObject(
  scope: BrowsedScope,
  astObject: AstExpressionObject,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astObject.block);
}
