import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { astReferenceValueAsStatementVariable } from '../../../data/ast/AstReferenceValue.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

export function browseExpressionFunction(astExpressionFunction: AstExpressionFunction) {
  const referenceClosures = ensure(astExpressionFunction.referenceClosures);
  for (const referenceClosure of referenceClosures) {
    const referenceValue = ensure(referenceClosure.resolvedReferenceValue);
    const statementVariable = astReferenceValueAsStatementVariable(referenceValue);
    if (statementVariable) {
      if (statementVariable.mutable) {
        statementVariable.resolvedHeapized = true;
      }
    }
  }
}
