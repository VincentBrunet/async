import { AstWhile } from "../../../data/ast/AstWhile.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseWhile(
  scope: BrowsedScope,
  astWhile: AstWhile,
) {
  browseExpression(scope, astWhile.condition);
  browseBlock(scope, astWhile.block);
}
