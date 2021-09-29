import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionLookup(
  scope: BrowsedScope,
  ast: AstExpressionLookup,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression.resolvedType; // TODO
}
