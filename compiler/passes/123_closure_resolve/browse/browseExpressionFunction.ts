import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionFunction(
  scope: Scope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushName(astParam.name);
    }
  }
  next();
  ast.resolvedClosures = scope.readClosures();
}
