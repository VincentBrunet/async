import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseTypeIdentifier(
  scope: BrowsedScope,
  ast: AstTypeIdentifier,
  next: () => void,
) {
  ast.resolved = scope.findShorthand(ast.name);
  next();
}
