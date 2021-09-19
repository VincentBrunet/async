import { AstType } from "./AstType.ts";

export interface AstTypeObjectField {
  mutable: boolean;
  name: string;
  hash: string;
  type: AstType;
}

export interface AstTypeObject {
  fields: Array<AstTypeObjectField>;
}
