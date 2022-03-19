import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export interface AstAnnotationType extends Ast {
  type?: AstType;
}
