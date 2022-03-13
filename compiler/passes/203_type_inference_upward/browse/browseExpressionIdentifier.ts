import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { computeResolvedReferenceType } from "../util/computeResolvedReferenceType.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => void,
) {
  // Asserts
  const resolvedReference = ensure(ast.resolvedReference);

  next();

  ast.resolvedType = computeResolvedReferenceType(resolvedReference);
}
