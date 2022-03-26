import { Ast } from './Ast.ts';
import { AstAnnotationTemplateParam } from './AstAnnotationTemplate.ts';
import { AstStatementImportSlot } from './AstStatementImport.ts';
import { AstStatementTypedef } from './AstStatementTypedef.ts';

export enum AstReferenceTypeKind {
  AnnotationTemplateParam = 'AnnotationTemplateParam',
  StatementTypedef = 'StatementTypedef',
  StatementImportSlot = 'StatementImportSlot',
}

export type AstReferenceTypeData =
  | AstAnnotationTemplateParam
  | AstStatementTypedef
  | AstStatementImportSlot;

export interface AstReferenceType extends Ast {
  kind: AstReferenceTypeKind;
  data: AstReferenceTypeData;
}

export function astReferenceTypeAsAnnotationTemplateParam(
  astReferenceType: AstReferenceType,
): AstAnnotationTemplateParam | undefined {
  if (astReferenceType.kind === AstReferenceTypeKind.AnnotationTemplateParam) {
    return astReferenceType.data as AstAnnotationTemplateParam;
  }
  return undefined;
}

export function astReferenceTypeAsStatementTypedef(
  astReferenceType: AstReferenceType,
): AstStatementTypedef | undefined {
  if (astReferenceType.kind === AstReferenceTypeKind.StatementTypedef) {
    return astReferenceType.data as AstStatementTypedef;
  }
  return undefined;
}

export function astReferenceTypeAsStatementImportSlot(
  astReferenceType: AstReferenceType,
): AstStatementImportSlot | undefined {
  if (astReferenceType.kind === AstReferenceTypeKind.StatementImportSlot) {
    return astReferenceType.data as AstStatementImportSlot;
  }
  return undefined;
}
