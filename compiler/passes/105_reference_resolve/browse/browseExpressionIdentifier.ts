import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionIdentifier(
  scope: BrowsedScope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  ast.resolvedReference = scope.findReference(ast.name);
  await next();
}
