import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionIdentifier(
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
  next: () => void,
) {
  next();
  if (ast.resolvedReference === undefined) {
    throw new Error("Identifier unresolved:" + ast.name);
  }
  ast.resolvedType = ast.resolvedReference.data.resolvedType;
}
