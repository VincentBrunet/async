import { AstType } from "./AstType.ts";

export interface AstTypeObjectField {
  name: string;
  type: AstType;
}

export interface AstTypeObject {
  fields: Array<AstTypeObjectField>;
}
