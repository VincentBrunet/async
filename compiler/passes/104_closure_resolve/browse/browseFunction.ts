import { AstExpressionFunction } from "../../../data/ast/expression/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseFunction(
  scope: BrowsedScope,
  astFunction: AstExpressionFunction,
) {
  const child = new BrowsedScope(scope);
  for (const astParam of astFunction.params) {
    child.pushName(astParam.name);
  }
  browseBlock(child, astFunction.block);
  astFunction.closures = child.readClosures();
}
