import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { computeResolvedReferenceType } from "../util/computeResolvedReferenceType.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedReference = ensure(ast.resolvedReference);

  await next();

  ast.resolvedType = computeResolvedReferenceType(resolvedReference);
}
