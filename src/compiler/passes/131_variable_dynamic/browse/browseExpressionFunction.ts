import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { astReferenceValueAsReferenceValueClosure, astReferenceValueAsStatementVariable } from '../../../data/ast/AstReferenceValue.ts';
import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

function browseReferenceValueClosure(astReferenceValueClosure: AstReferenceValueClosure): void {
  const referenceValue = ensure(astReferenceValueClosure.resolvedReferenceValue);
  const statementVariable = astReferenceValueAsStatementVariable(referenceValue);
  if (statementVariable) {
    if (statementVariable.mutable) {
      statementVariable.resolvedDynamic = true;
    }
    return;
  }
  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(referenceValue);
  if (referenceValueClosure) {
    browseReferenceValueClosure(referenceValueClosure);
    return;
  }
}

export function browseExpressionFunction(ast: AstExpressionFunction) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);
  // ValueClosures
  for (const referenceValueClosure of referenceValueClosures) {
    browseReferenceValueClosure(referenceValueClosure);
  }
}
