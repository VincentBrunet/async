import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpression(
  scope: Scope,
  ast: AstExpression,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedType = ast.data.resolvedType;
}
