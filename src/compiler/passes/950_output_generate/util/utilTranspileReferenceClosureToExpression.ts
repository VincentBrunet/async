import { AstReferenceClosure } from '../../../data/ast/AstReferenceClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTranspileReferenceValueToExpression } from './utilTranspileReferenceValueToExpression.ts';

export function utilTranspileReferenceClosureToExpression(
  astReferenceClosure: AstReferenceClosure,
): string {
  return utilTranspileReferenceValueToExpression(
    ensure(astReferenceClosure.resolvedReferenceValue),
    false,
  );
}
