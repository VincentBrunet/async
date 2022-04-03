import { ensure } from '../../../passes/errors/ensure.ts';
import {
  AstReferenceValue,
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceClosure,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';
import { astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';
import { never } from '../../errors/never.ts';

function utilTranspileReferenceValueToExpressionIsHeapized(astReferenceValue: AstReferenceValue): boolean | undefined {
  const statementVariable = astReferenceValueAsStatementVariable(astReferenceValue);
  if (statementVariable) {
    return statementVariable.resolvedHeapized;
  }
  const statementImportSlot = astReferenceValueAsStatementImportSlot(astReferenceValue);
  if (statementImportSlot) {
    const statementExportVariable = ensure(astStatementAsStatementVariable(
      ensure(statementImportSlot.resolvedExport).statement,
    ));
    return statementExportVariable.resolvedHeapized;
  }
  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(astReferenceValue);
  if (expressionFunctionParam) {
    return false;
  }
  const referenceClosure = astReferenceValueAsReferenceClosure(astReferenceValue);
  if (referenceClosure) {
    const resolvedReferenceClosure = ensure(referenceClosure.resolvedReferenceValue);
    return utilTranspileReferenceValueToExpressionIsHeapized(resolvedReferenceClosure);
  }
  never();
}

export function utilTranspileReferenceValueToExpression(
  astReferenceValue: AstReferenceValue,
  evaluate: boolean,
): string {
  const symbolLocalValue = ensure(astReferenceValue.data.symbolLocalValue);
  if (evaluate) {
    if (utilTranspileReferenceValueToExpressionIsHeapized(astReferenceValue)) {
      return '(*' + symbolLocalValue + ')';
    }
  }
  return symbolLocalValue;
}
