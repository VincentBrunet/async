import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  // Asserts
  if (!ast.resolvedClosures) {
    throw new Error("Undefined ast function closure");
  }

  for (const astClosure of ast.resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of ast.resolvedClosures) {
    scope.pushClosure(astClosure);
  }
  for (const astParam of ast.params) {
    scope.pushParam(astParam);
  }

  next();
}
