import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceValueClosure,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { never } from '../../../passes/errors/never.ts';

export function utilTypeForReferenceValue(astReferenceValue: AstReferenceValue) {
  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(astReferenceValue);
  if (referenceValueClosure) {
    return referenceValueClosure.resolvedType;
  }

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

  never();
}
