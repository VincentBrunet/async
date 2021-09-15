import { AstExpressionObject } from "../../../data/ast/expression/AstExpressionObject.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionObject,
) {
  // Asserts
  if (!ast.closures) {
    throw new Error("Object doesn't have proper closure");
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
