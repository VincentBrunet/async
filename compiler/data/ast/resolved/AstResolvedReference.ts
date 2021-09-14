import { AstParam } from "../AstParam.ts";
import { AstVariable } from "../AstVariable.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";

export enum AstResolvedReferenceKind {
  Variable = "Variable",
  Param = "Param",
  Closure = "Closure",
}

export type AstResolvedReferenceData =
  | AstVariable
  | AstParam
  | AstResolvedClosure;

export interface AstResolvedReference {
  kind: AstResolvedReferenceKind;
  data: AstResolvedReferenceData;
}
