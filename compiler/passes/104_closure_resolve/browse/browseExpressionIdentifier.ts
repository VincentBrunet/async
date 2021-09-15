import { AstExpressionIdentifier } from "../../../data/ast/expression/AstExpressionIdentifier.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionIdentifier(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
) {
  scope.propagateName(ast.name);
}
