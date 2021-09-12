import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseStatement } from "./browseStatement.ts";

export function browseBlock(
  scope: BrowsedScope,
  astBlock: AstBlock,
) {
  for (const astStatement of astBlock.statements) {
    browseStatement(scope, astStatement);
  }
}
