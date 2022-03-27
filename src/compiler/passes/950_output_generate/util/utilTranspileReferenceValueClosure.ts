import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Transpiler } from '../util/Transpiler.ts';
import {
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceValueClosure,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';

export function utilTranspileReferenceValueClosure(
  ast: AstReferenceValueClosure,
  transpiler: Transpiler,
): void {
  // Assert
  const resolvedReferenceValue = ensure(ast.resolvedReferenceValue);

  const statementVariable = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementVariable) {
    transpiler.pushStatementPart(ensure(statementVariable.symbolLocalValue));
    return;
  }

  const statementImportSlot = astReferenceValueAsStatementImportSlot(resolvedReferenceValue);
  if (statementImportSlot) {
    transpiler.pushStatementPart(ensure(statementImportSlot.symbolLocalValue));
    return;
  }

  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(resolvedReferenceValue);
  if (expressionFunctionParam) {
    transpiler.pushStatementPart('ref_make(');
    transpiler.pushStatementPart(ensure(expressionFunctionParam.symbolLocalValue));
    transpiler.pushStatementPart(')');
    return;
  }

  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(resolvedReferenceValue);
  if (referenceValueClosure) {
    transpiler.pushStatementPart(ensure(referenceValueClosure.symbolLocalValue));
  }
}
