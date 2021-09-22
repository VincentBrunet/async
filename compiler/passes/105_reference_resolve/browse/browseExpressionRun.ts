import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => void,
) {
  // Asserts
  if (!ast.closures) {
    throw new Error("Run doesn't have proper closure");
  }

  for (const astClosure of ast.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  for (const astClosure of ast.closures) {
    scope.pushClosure(astClosure);
  }

  next();
}
