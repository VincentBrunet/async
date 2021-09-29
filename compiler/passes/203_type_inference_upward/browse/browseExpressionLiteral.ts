import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionLiteral(
  scope: BrowsedScope,
  ast: AstExpressionLiteral,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedType = makeTypePrimitive(ast.native, [], ast);
}
