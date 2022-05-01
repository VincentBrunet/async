import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Tracker } from '../util/Tracker.ts';
import { utilTypeForReferenceValue } from '../util/utilTypeForReferenceValue.ts';

export function browseExpressionIdentifier(
  next: () => void,
  expressionIdentifier: AstExpressionIdentifier,
  tracker: Tracker,
) {
  // Asserts
  const resolvedReferenceValue = ensure(
    expressionIdentifier.resolvedReferenceValue,
    expressionIdentifier.name,
  );

  next();

  expressionIdentifier.resolvedType = utilTypeForReferenceValue(resolvedReferenceValue);
}
