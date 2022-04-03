import { ensure } from '../../../passes/errors/ensure.ts';
import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { never } from '../../errors/never.ts';

export function utilTranspileReferenceValueToExpression(
  astReferenceValue: AstReferenceValue,
  evaluate: boolean,
): string {
  const statementVariable = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementVariable) {
    if (evaluate) {
      if (statementVariable.resolvedHeapized) {
        return '*' + ensure(statementVariable.symbolLocalValue);
      }
    }
    return ensure(statementVariable.symbolLocalValue);
  }

  const statementImportSlot = astReferenceValueAsStatementImportSlot(astReferenceValue);
  if (statementImportSlot) {
    if (evaluate) {
      const statementExportVariable = ensure(astStatementAsStatementVariable(
        ensure(statementImportSlot.resolvedExport).statement,
      ));
      if (statementExportVariable.resolvedHeapized) {
        return '*' + ensure(statementImportSlot.symbolLocalValue);
      }
    }
  }

  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(astReferenceValue);
  if (expressionFunctionParam) {
    return ensure(expressionFunctionParam.symbolLocalValue);
  }

  never();
}
