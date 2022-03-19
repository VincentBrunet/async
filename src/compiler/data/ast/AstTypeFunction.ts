import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeFunctionParam extends Ast {
  name?: string;
  type: AstType;
}

export interface AstTypeFunction extends Ast {
  params: Array<AstTypeFunctionParam>;
  ret: AstType;
}
