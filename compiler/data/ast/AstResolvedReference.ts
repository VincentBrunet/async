import { Ast } from "./Ast.ts";
import { AstAnnotationTemplateParam } from "./AstAnnotationTemplate.ts";
import { AstExpressionFunctionParam } from "./AstExpressionFunction.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementImportSlot } from "./AstStatementImport.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export enum AstResolvedReferenceKind {
  TemplateParam = "TemplateParam",
  StatementTypedef = "StatementTypedef",
  StatementVariable = "StatementVariable",
  StatementImportSlot = "StatementImportSlot",
  ExpressionFunctionParam = "ExpressionFunctionParam",
  ResolvedClosure = "ResolvedClosure",
}

export type AstResolvedReferenceData =
  | AstAnnotationTemplateParam
  | AstStatementTypedef
  | AstStatementVariable
  | AstStatementImportSlot
  | AstExpressionFunctionParam
  | AstResolvedClosure;

export interface AstResolvedReference extends Ast {
  kind: AstResolvedReferenceKind;
  data: AstResolvedReferenceData;
}
