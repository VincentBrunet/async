import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export enum AstExpressionTypingOperator {
  Is = "Is",
}

export interface AstExpressionTyping {
  operator: AstExpressionTypingOperator;
  expression: AstExpression;
  type: AstType;
}
