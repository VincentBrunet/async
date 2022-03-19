import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionLookup extends Ast {
  expression: AstExpression;
  name: string;
  hash: string;

  resolvedType?: AstType;
}
