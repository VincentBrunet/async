import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedClosures = scope.readClosures();
}
