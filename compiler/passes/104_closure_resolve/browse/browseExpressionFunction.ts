import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  for (const astParam of ast.params) {
    scope.pushName(astParam.name);
  }
  next();
  ast.closures = scope.readClosures();
}
