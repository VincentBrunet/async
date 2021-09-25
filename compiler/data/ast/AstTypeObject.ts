import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  type: AstType;
}

export interface AstTypeObject extends Ast {
  fields: Array<AstTypeObjectField>;
}
