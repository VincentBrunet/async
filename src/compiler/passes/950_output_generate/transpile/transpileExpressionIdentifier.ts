import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import {
  astReferenceValueAsExpressionFunctionParam,
  astReferenceValueAsReferenceValueClosure,
  astReferenceValueAsStatementVariable,
} from '../../../data/ast/AstReferenceValue.ts';

export function transpileExpressionIdentifier(
  pass: RecursorPass,
  astIdentifier: AstExpressionIdentifier,
  transpiler: Transpiler,
) {
  // Assert
  const resolvedReferenceValue = ensure(astIdentifier.resolvedReferenceValue);

  // Closure case
  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(resolvedReferenceValue);
  if (referenceValueClosure) {
    transpiler.pushStatementPart('closure[');
    transpiler.pushStatementPart(referenceValueClosure.idx.toString());
    transpiler.pushStatementPart(']->value');
  }

  // Function param case
  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(resolvedReferenceValue);
  if (expressionFunctionParam) {
    transpiler.pushStatementPart(ensure(expressionFunctionParam.symbolLocalValue));
  }

  // Local variable case
  const statementVariable = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementVariable) {
    transpiler.pushStatementPart(ensure(statementVariable.symbolLocalValue));
    transpiler.pushStatementPart('->value');
    return;
  }

  // Imported variable case
  const statementImportSlot = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementImportSlot) {
    transpiler.pushStatementPart(ensure(statementImportSlot.symbolLocalValue));
    transpiler.pushStatementPart('->value');
    return;
  }
}
