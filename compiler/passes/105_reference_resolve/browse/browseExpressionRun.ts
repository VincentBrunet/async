import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionRun,
) {
  // Asserts
  if (!ast.closures) {
    throw new Error("Run doesn't have proper closure");
  }

  for (const astClosure of ast.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new BrowsedScope(scope);

  for (const astClosure of ast.closures) {
    child.pushClosure(astClosure);
  }

  recursor.recurseBlock(recursor, child, ast.block);
}
