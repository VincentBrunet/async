import { AstClosure } from "./AstClosure.ts";
import { AstParam } from "./AstParam.ts";
import { AstVariable } from "./AstVariable.ts";

export enum AstReferenceKind {
  Variable = "Variable",
  Param = "Param",
  Closure = "Closure",
}

export type AstReferenceData =
  | AstVariable
  | AstParam
  | AstClosure;

export interface AstReference {
  kind: AstReferenceKind;
  data: AstReferenceData;
}
