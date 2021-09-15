import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionIdentifier(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
) {
  ast.reference = scope.findReference(ast.name);
}
