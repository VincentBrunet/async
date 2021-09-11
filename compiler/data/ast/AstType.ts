export enum AstTypeKind {
  Infered = "infered",
}

export type AstTypeData = {
  description?: string; // TODO
};

export interface AstType {
  kind: AstTypeKind;
  data: AstTypeData;
}
