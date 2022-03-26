import { AstExpressionFunctionParam } from '../../../data/ast/AstExpressionFunction.ts';
import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';
import { AstStatementImportSlot } from '../../../data/ast/AstStatementImport.ts';
import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashLocalSymbol } from '../../../passes/hash/hashLocalSymbol.ts';
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
    transpiler.pushStatementPart(
      hashLocalSymbol('variable', statementVariable.name),
    );
    return;
  }

  const statementImportSlot = astReferenceValueAsStatementImportSlot(resolvedReferenceValue);
  if (statementImportSlot) {
    transpiler.pushStatementPart(
      hashLocalSymbol('import', statementImportSlot.name),
    );
    return;
  }

  const expressionFunctionParam = astReferenceValueAsExpressionFunctionParam(resolvedReferenceValue);
  if (expressionFunctionParam) {
    transpiler.pushStatementPart('ref_make(');
    transpiler.pushStatementPart(
      hashLocalSymbol('param', ensure(expressionFunctionParam.name)),
    );
    transpiler.pushStatementPart(')');
    return;
  }

  const referenceValueClosure = astReferenceValueAsReferenceValueClosure(resolvedReferenceValue);
  if (referenceValueClosure) {
    transpiler.pushStatementPart('closure[');
    transpiler.pushStatementPart(referenceValueClosure.idx.toString());
    transpiler.pushStatementPart(']');
  }
}
