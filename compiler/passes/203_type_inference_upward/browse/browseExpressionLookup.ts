import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionLookup(
  scope: Scope,
  ast: AstExpressionLookup,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression.resolvedType; // TODO
}
