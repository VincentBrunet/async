import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { computeReferenceType } from "../util/computeReferenceType.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedReference = ensure(ast.resolvedReference);

  await next();

  ast.resolvedType = computeReferenceType(resolvedReference);
}
