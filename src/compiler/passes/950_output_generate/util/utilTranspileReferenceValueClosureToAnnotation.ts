import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTranspileReferenceValueToAnnotation } from './utilTranspileReferenceValueToAnnotation.ts';

export function utilTranspileReferenceValueClosureToAnnotation(
  astReferenceValueClosure: AstReferenceValueClosure,
): string {
  return utilTranspileReferenceValueToAnnotation(
    ensure(astReferenceValueClosure.resolvedReferenceValue),
  );
}
