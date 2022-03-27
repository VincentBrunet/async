import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { astReferenceValueAsReferenceValueClosure, astReferenceValueAsStatementVariable } from '../../../data/ast/AstReferenceValue.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

export function utilBrowseReferenceValueClosure(referenceValueClosure: AstReferenceValueClosure) {
  const referenceValue = ensure(referenceValueClosure.resolvedReferenceValue);
  const statementVariable = astReferenceValueAsStatementVariable(referenceValue);
  if (statementVariable) {
    referenceValueClosure.resolvedMutable = statementVariable.mutable;
    return;
  }
  const parentReferenceValueClosure = astReferenceValueAsReferenceValueClosure(referenceValue);
  if (parentReferenceValueClosure) {
    referenceValueClosure.resolvedMutable = parentReferenceValueClosure.resolvedMutable;
    return;
  }
}
