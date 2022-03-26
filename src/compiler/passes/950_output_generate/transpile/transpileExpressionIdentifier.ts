import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashLocalSymbol } from '../../../passes/hash/hashLocalSymbol.ts';
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
    transpiler.pushStatementPart(
      hashLocalSymbol('param', ensure(expressionFunctionParam.name)),
    );
  }

  // Local variable case
  const statementVariable = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementVariable) {
    transpiler.pushStatementPart(
      hashLocalSymbol('variable', statementVariable.name),
    );
    transpiler.pushStatementPart('->value');
    return;
  }

  // Imported variable case
  const statementImportSlot = astReferenceValueAsStatementVariable(resolvedReferenceValue);
  if (statementImportSlot) {
    transpiler.pushStatementPart(
      hashLocalSymbol('import', statementImportSlot.name),
    );
    transpiler.pushStatementPart('->value');
    return;
  }
}
