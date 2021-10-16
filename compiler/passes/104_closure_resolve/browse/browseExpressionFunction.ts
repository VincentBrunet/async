import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionFunction(
  scope: Scope,
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
