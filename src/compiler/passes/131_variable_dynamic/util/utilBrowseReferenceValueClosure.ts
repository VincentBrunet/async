import { astReferenceValueAsReferenceValueClosure, astReferenceValueAsStatementVariable } from '../../../data/ast/AstReferenceValue.ts';
import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../errors/ensure.ts';

export function utilBrowseReferenceValueClosure(astReferenceValueClosure: AstReferenceValueClosure): void {
  const referenceValue = ensure(astReferenceValueClosure.resolvedReferenceValue);
  const referenceVariable = astReferenceValueAsStatementVariable(referenceValue);
  if (referenceVariable) {
    referenceVariable.resolvedDynamic = true;
    return;
  }
  const referenceClosure = astReferenceValueAsReferenceValueClosure(referenceValue);
  if (referenceClosure) {
    utilBrowseReferenceValueClosure(referenceClosure);
    return;
  }
}
