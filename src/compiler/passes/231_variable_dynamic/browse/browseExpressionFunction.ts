import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { astReferenceValueAsStatementVariable } from '../../../data/ast/AstReferenceValue.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { utilBrowseReferenceValueClosure } from '../util/utilBrowseReferenceValueClosure.ts';

export function browseExpressionFunction(astExpressionFunction: AstExpressionFunction) {
  const referenceValueClosures = ensure(astExpressionFunction.referenceValueClosures);
  for (const referenceValueClosure of referenceValueClosures) {
    utilBrowseReferenceValueClosure(referenceValueClosure);
    const referenceValue = ensure(referenceValueClosure.resolvedReferenceValue);
    const statementVariable = astReferenceValueAsStatementVariable(referenceValue);
    if (statementVariable) {
      if (statementVariable.mutable) {
        statementVariable.resolvedHeapized = true;
      }
    }
  }
}
