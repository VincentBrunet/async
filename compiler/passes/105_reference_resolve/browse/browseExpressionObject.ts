import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => void,
) {
  // Asserts
  if (!ast.resolvedClosures) {
    throw new Error("Object doesn't have proper closure");
  }

  for (const astClosure of ast.resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of ast.resolvedClosures) {
    scope.pushClosure(astClosure);
  }

  next();
}
