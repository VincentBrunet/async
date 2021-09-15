import { AstExpressionObject } from "../../../data/ast/expression/AstExpressionObject.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionObject,
) {
  const child = new BrowsedScope(scope);
  recursor.recurseBlock(recursor, child, ast.block);
  ast.closures = child.readClosures();
}
