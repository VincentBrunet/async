import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionRun,
) {
  const child = new BrowsedScope(scope);
  recursor.recurseBlock(recursor, child, ast.block);
  ast.closures = child.readClosures();
}
