import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import {
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceValueClosure,
  astReferenceValueAsStatementImportSlot,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';

export function transpileExpressionIdentifier(
  pass: RecursorPass,
  astIdentifier: AstExpressionIdentifier,
  transpiler: Transpiler,
) {
  // Assert
  const resolvedReferenceValue = ensure(astIdentifier.resolvedReferenceValue);
  // Local variable case
  const statementVariable = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementVariable) {
    if (statementVariable.mutable) {
      transpiler.pushStatementPart('*');
    }
    transpiler.pushStatementPart(ensure(statementVariable.symbolLocalValue));
    return;
  }
  // Imported variable case
  const statementImportSlot = astReferenceValueAsStatementImportSlot(resolvedReferenceValue);
  if (statementImportSlot) {
    if (ensure(statementImportSlot.resolvedExport).resolvedMutable) {
      transpiler.pushStatementPart('*');
    }
    transpiler.pushStatementPart(ensure(statementImportSlot.symbolLocalValue));
    return;
  }
  // Function param case
  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(resolvedReferenceValue);
  if (expressionFunctionParam) {
    transpiler.pushStatementPart(ensure(expressionFunctionParam.symbolLocalValue));
    return;
  }
  // Closure case
  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(resolvedReferenceValue);
  if (referenceValueClosure) {
    if (referenceValueClosure.resolvedMutable) {
      transpiler.pushStatementPart('*');
    }
    transpiler.pushStatementPart(ensure(referenceValueClosure.symbolLocalValue));
    return;
  }
}
