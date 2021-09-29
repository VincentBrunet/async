import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushName(astParam.name);
    }
  }
  await next();
  ast.resolvedClosures = scope.readClosures();
}
