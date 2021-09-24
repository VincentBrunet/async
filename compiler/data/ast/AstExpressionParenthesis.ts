import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionParenthesis {
  expression: AstExpression;

  resolvedType?: AstType;
}
