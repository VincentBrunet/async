import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionCall extends Ast {
  callee: AstExpression;
  params: Array<AstExpression>;

  resolvedType?: AstType;
}
