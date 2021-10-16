import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  scope.propagateName(ast.name);
  await next();
}
