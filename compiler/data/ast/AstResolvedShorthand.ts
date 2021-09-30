import { Ast } from "./Ast.ts";
import { AstAnnotationTemplateParam } from "./AstAnnotationTemplate.ts";
import { AstStatementImportSlot } from "./AstStatementImport.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";

export enum AstResolvedShorthandKind {
  Typedef = "Typedef",
  TemplateParam = "TemplateParam",
  ImportSlot = "ImportSlot",
}

export type AstResolvedShorthandData =
  | AstStatementTypedef
  | AstAnnotationTemplateParam
  | AstStatementImportSlot;

export interface AstResolvedShorthand extends Ast {
  kind: AstResolvedShorthandKind;
  data: AstResolvedShorthandData;
}
