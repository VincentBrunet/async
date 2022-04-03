import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilTranspileReferenceValueToExpression } from './utilTranspileReferenceValueToExpression.ts';

export function utilTranspileReferenceValueClosureToExpression(
  astReferenceValueClosure: AstReferenceValueClosure,
): string {
  return utilTranspileReferenceValueToExpression(
    ensure(astReferenceValueClosure.resolvedReferenceValue),
    false,
  );
}
