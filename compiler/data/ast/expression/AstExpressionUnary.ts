import { AstExpression } from "./AstExpression.ts";

export enum AstExpressionUnaryOperator {
  Positive = "Positive",
  Negative = "Negative",
  Not = "Not",
}

export interface AstExpressionUnary {
  operator: AstExpressionUnaryOperator;
  expression: AstExpression;
}
