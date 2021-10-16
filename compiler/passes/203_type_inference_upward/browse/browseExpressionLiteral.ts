import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionLiteral(
  scope: Scope,
  ast: AstExpressionLiteral,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedType = makeTypePrimitive(ast.native, [], ast);
}
