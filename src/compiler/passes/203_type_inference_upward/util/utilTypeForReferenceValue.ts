import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceClosure,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { AstType } from '../../../data/ast/AstType.ts';
import { never } from '../../../passes/errors/never.ts';
import { ensure } from '../../errors/ensure.ts';

export function utilTypeForReferenceValue(astReferenceValue: AstReferenceValue): AstType | undefined {
  const statementVariable = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementVariable) {
    return statementVariable.resolvedType;
  }
  const statementImportSlot = astReferenceValueAsStatementImportSlot(astReferenceValue);
  if (statementImportSlot) {
    const statementExportVariable = ensure(astStatementAsStatementVariable(
      ensure(statementImportSlot.resolvedExport).statement,
    ));
    return statementExportVariable.resolvedType;
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
