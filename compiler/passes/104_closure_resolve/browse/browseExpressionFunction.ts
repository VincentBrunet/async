import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionFunction,
) {
  const child = new BrowsedScope(scope);
  for (const astParam of ast.params) {
    child.pushName(astParam.name);
  }
  recursor.recurseBlock(recursor, child, ast.block);
  ast.closures = child.readClosures();
}
