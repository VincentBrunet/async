import { AstExpressionFunction } from "../../../data/ast/expression/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseFunction(
  scope: BrowsedScope,
  astFunction: AstExpressionFunction,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astFunction.block);
}
