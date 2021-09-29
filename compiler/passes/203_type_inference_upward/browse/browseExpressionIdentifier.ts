import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionIdentifier(
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  await next();
  if (ast.resolvedReference === undefined) {
    throw new Error("Identifier unresolved:" + ast.name);
  }
  ast.resolvedType = ast.resolvedReference.data.resolvedType;
}
