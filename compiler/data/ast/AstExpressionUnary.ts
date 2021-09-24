import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export enum AstExpressionUnaryOperator {
  Positive = "Positive",
  Negative = "Negative",
  Not = "Not",
}

export interface AstExpressionUnary {
  operator: AstExpressionUnaryOperator;
  expression: AstExpression;

  resolvedType?: AstType;
}
