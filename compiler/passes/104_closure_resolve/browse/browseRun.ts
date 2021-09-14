import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseRun(
  scope: BrowsedScope,
  astRun: AstExpressionRun,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astRun.block);
  astRun.closures = child.readClosures();
}
