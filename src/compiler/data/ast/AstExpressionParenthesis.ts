import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionParenthesis extends Ast {
  expression: AstExpression;

  resolvedType?: AstType;
}
