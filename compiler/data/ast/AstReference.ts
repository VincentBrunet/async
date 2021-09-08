
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
  kind: AstReferenceLind;
  data: AstReferenceData;
}
