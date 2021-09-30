import { Ast } from "./Ast.ts";
import { AstExpressionFunctionParam } from "./AstExpressionFunction.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementImportSlot } from "./AstStatementImport.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export enum AstResolvedReferenceKind {
  Variable = "Variable",
  FunctionParam = "FunctionParam",
  ImportSlot = "ImportSlot",
  Closure = "Closure",
}

export type AstResolvedReferenceData =
  | AstStatementVariable
  | AstExpressionFunctionParam
  | AstStatementImportSlot
  | AstResolvedClosure;

export interface AstResolvedReference extends Ast {
  kind: AstResolvedReferenceKind;
  data: AstResolvedReferenceData;
}
