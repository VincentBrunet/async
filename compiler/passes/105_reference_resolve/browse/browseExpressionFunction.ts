import { AstExpressionFunction } from "../../../data/ast/expression/AstExpressionFunction.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionFunction,
) {
  // Asserts
  if (!ast.closures) {
    throw new Error("Undefined ast function closure");
  }

  for (const astClosure of ast.closures) {
    astClosure.reference = scope.findReference(astClosure.name);
  }

  const child = new BrowsedScope(scope);

  for (const astClosure of ast.closures) {
    child.pushClosure(astClosure);
  }
  for (const astParam of ast.params) {
    child.pushParam(astParam);
  }

  recursor.recurseBlock(recursor, child, ast.block);
}
