import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceClosure,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { AstType } from '../../../data/ast/AstType.ts';
import { never } from '../../../passes/errors/never.ts';

export function utilTypeForReferenceValue(astReferenceValue: AstReferenceValue): AstType | undefined {
  const statementVariable = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementVariable) {
    return statementVariable.resolvedType;
  }
  const statementImportSlot = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementImportSlot) {
    return statementImportSlot.resolvedType;
  }
  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(astReferenceValue);
  if (expressionFunctionParam) {
    return expressionFunctionParam.resolvedType;
  }
  const referenceClosure = astReferenceValueAsReferenceClosure(astReferenceValue);
  if (referenceClosure) {
    return referenceClosure.resolvedType;
  }
  never();
}
