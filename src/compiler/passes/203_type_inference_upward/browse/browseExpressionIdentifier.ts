import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { computeResolvedReferenceType } from '../util/computeResolvedReferenceType.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionIdentifier(
  next: () => void,
  ast: AstExpressionIdentifier,
  tracker: Tracker,
) {
  // Asserts
  const resolvedReference = ensure(ast.resolvedReference);

  next();

  ast.resolvedType = computeResolvedReferenceType(resolvedReference);
}
