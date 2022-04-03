import { ensure } from '../../../passes/errors/ensure.ts';
import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceClosure,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { utilTranspileTypeToAnnotation } from './utilTranspileTypeToAnnotation.ts';
import { never } from '../../errors/never.ts';

export function utilTranspileReferenceValueToAnnotation(
  astReferenceValue: AstReferenceValue,
): string {
  const statementVariable = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementVariable) {
    return utilTranspileTypeToAnnotation(
      ensure(statementVariable.resolvedType),
      statementVariable.resolvedHeapized,
    );
  }

  const statementImportSlot = astReferenceValueAsStatementImportSlot(astReferenceValue);
  if (statementImportSlot) {
    const statementExportVariable = ensure(astStatementAsStatementVariable(
      ensure(statementImportSlot.resolvedExport).statement,
    ));
    return utilTranspileTypeToAnnotation(
      ensure(statementExportVariable.resolvedType),
      statementExportVariable.resolvedHeapized,
    );
  }

  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(astReferenceValue);
  if (expressionFunctionParam) {
    return utilTranspileTypeToAnnotation(
      ensure(expressionFunctionParam.resolvedType),
      false,
    );
  }

  const referenceClosure = astReferenceValueAsReferenceClosure(astReferenceValue);
  if (referenceClosure) {
    return utilTranspileReferenceValueToAnnotation(
      ensure(referenceClosure.resolvedReferenceValue),
    );
  }

  never();
}
