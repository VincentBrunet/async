import { AstAnnotationTemplateParam } from "./AstAnnotationTemplate.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";

export enum AstResolvedShorthandKind {
  Typedef = "Typedef",
  TemplateParam = "TemplateParam",
}

export type AstResolvedShorthandData =
  | AstStatementTypedef
  | AstAnnotationTemplateParam;

export interface AstResolvedShorthand {
  kind: AstResolvedShorthandKind;
  data: AstResolvedShorthandData;
}
