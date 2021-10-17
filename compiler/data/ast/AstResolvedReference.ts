import { Ast } from "./Ast.ts";
import { AstExpressionFunctionParam } from "./AstExpressionFunction.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementImportSlot } from "./AstStatementImport.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export enum AstResolvedReferenceKind {
  StatementVariable = "StatementVariable",
  StatementImportSlot = "StatementImportSlot",
  ExpressionFunctionParam = "ExpressionFunctionParam",
  ResolvedClosure = "ResolvedClosure",
}

export type AstResolvedReferenceData =
  | AstStatementVariable
  | AstStatementImportSlot
  | AstExpressionFunctionParam
  | AstResolvedClosure;

export interface AstResolvedReference extends Ast {
  kind: AstResolvedReferenceKind;
  data: AstResolvedReferenceData;
}
