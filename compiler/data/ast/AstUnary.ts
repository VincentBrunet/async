import { AstExpression } from "./AstExpression.ts";

export enum AstUnaryOperator {
  Positive = "Positive",
  Negative = "Negative",
}

export interface AstUnary {
  operator: AstUnaryOperator;
  expression: AstExpression;
}
