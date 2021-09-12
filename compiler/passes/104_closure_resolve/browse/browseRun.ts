import { AstRun } from "../../../data/ast/AstRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseBlock } from "./browseBlock.ts";

export function browseRun(
  scope: BrowsedScope,
  astRun: AstRun,
) {
  const child = new BrowsedScope(scope);
  browseBlock(child, astRun.block);
  astRun.closures = child.readClosures();
}
