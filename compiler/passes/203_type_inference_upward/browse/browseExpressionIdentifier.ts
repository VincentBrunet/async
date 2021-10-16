import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  await next();
  if (ast.resolvedReference === undefined) {
    throw new Error("Identifier unresolved:" + ast.name);
  }
  ast.resolvedType = ast.resolvedReference.data.resolvedType;
}
