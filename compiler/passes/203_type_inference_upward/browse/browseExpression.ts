import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpression(
  scope: BrowsedScope,
  ast: AstExpression,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedType = ast.data.resolvedType;
}
