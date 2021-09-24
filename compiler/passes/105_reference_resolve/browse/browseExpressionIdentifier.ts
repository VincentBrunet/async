import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionIdentifier(
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
  next: () => void,
) {
  ast.resolvedReference = scope.findReference(ast.name);
  next();
}
