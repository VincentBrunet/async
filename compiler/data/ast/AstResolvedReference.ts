import { Ast } from "./Ast.ts";
import { AstExpressionFunctionParam } from "./AstExpressionFunction.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export enum AstResolvedReferenceKind {
  Variable = "Variable",
  Param = "Param",
  Closure = "Closure",
}

export type AstResolvedReferenceData =
  | AstStatementVariable
  | AstExpressionFunctionParam
  | AstResolvedClosure;

export interface AstResolvedReference extends Ast {
  kind: AstResolvedReferenceKind;
  data: AstResolvedReferenceData;
}
