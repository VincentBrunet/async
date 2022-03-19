import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeParenthesis extends Ast {
  type: AstType;
}
