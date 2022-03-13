import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionLiteral(
  scope: Scope,
  ast: AstExpressionLiteral,
  next: () => void,
) {
  next();
  ast.resolvedType = makeTypePrimitive(ast.native, [], ast);
}
