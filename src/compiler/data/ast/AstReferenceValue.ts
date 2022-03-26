import { Ast } from './Ast.ts';
import { AstExpressionFunctionParam } from './AstExpressionFunction.ts';
import { AstReferenceValueClosure } from './AstReferenceValueClosure.ts';
import { AstStatementImportSlot } from './AstStatementImport.ts';
import { AstStatementVariable } from './AstStatementVariable.ts';

export enum AstReferenceValueKind {
  StatementVariable = 'StatementVariable',
  StatementImportSlot = 'StatementImportSlot',
  ExpressionFunctionParam = 'ExpressionFunctionParam',
  ReferenceValueClosure = 'ReferenceValueClosure',
}

export type AstReferenceValueData =
  | AstStatementVariable
  | AstStatementImportSlot
  | AstExpressionFunctionParam
  | AstReferenceValueClosure;

export interface AstReferenceValue extends Ast {
  kind: AstReferenceValueKind;
  data: AstReferenceValueData;
}

export function astReferenceValueAsStatementVariable(
  astReferenceValue: AstReferenceValue,
): AstStatementVariable | undefined {
  if (astReferenceValue.kind === AstReferenceValueKind.StatementVariable) {
    return astReferenceValue.data as AstStatementVariable;
  }
  return undefined;
}

export function astReferenceValueAsStatementImportSlot(
  astReferenceValue: AstReferenceValue,
): AstStatementImportSlot | undefined {
  if (astReferenceValue.kind === AstReferenceValueKind.StatementImportSlot) {
    return astReferenceValue.data as AstStatementImportSlot;
  }
  return undefined;
}

export function astReferenceValueAsExpressionFunctionParam(
  astReferenceValue: AstReferenceValue,
): AstExpressionFunctionParam | undefined {
  if (astReferenceValue.kind === AstReferenceValueKind.ExpressionFunctionParam) {
    return astReferenceValue.data as AstExpressionFunctionParam;
  }
  return undefined;
}

export function astReferenceValueAsReferenceValueClosure(
  astReferenceValue: AstReferenceValue,
): AstReferenceValueClosure | undefined {
  if (astReferenceValue.kind === AstReferenceValueKind.ReferenceValueClosure) {
    return astReferenceValue.data as AstReferenceValueClosure;
  }
  return undefined;
}
