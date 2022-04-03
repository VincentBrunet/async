import { AstReferenceClosure } from '../../../data/ast/AstReferenceClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTranspileReferenceValueToAnnotation } from './utilTranspileReferenceValueToAnnotation.ts';

export function utilTranspileReferenceClosureToAnnotation(
  astReferenceClosure: AstReferenceClosure,
): string {
  return utilTranspileReferenceValueToAnnotation(
    ensure(astReferenceClosure.resolvedReferenceValue),
  );
}
