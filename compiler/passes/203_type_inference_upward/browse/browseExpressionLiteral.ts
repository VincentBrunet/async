import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionLiteral(
  scope: BrowsedScope,
  ast: AstExpressionLiteral,
  next: () => void,
) {
  next();
  ast.resolvedType = makeTypePrimitive(ast.id, [], ast);
}
