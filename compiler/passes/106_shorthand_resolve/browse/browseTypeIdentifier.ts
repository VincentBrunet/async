import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseTypeIdentifier(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstTypeIdentifier,
) {
  ast.resolved = scope.findShorthand(ast.name);
  for (const param of ast.params) {
    recursor.recurseType(recursor, scope, param);
  }
}
