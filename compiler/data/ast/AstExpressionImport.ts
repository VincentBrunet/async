import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionImport extends Ast {
  url: string;

  resolvedType?: AstType;
}
