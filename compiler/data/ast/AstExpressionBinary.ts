import { AstExpression } from "./AstExpression.ts";

export enum AstExpressionBinaryOperator {
  Addition = "Addition",
  Substraction = "Substraction",
  Multiplication = "Multiplication",
  Division = "Division",
  Modulo = "Modulo",
  And = "And",
  Or = "Or",
  Equal = "Equal",
  NotEqual = "NotEqual",
  Less = "Less",
  LessOrEqual = "LessOrEqual",
  More = "More",
  MoreOrEqual = "MoreOrEqual",
  Assign = "Assign",
}

export interface AstExpressionBinary {
  operator: AstExpressionBinaryOperator;
  expression1: AstExpression;
  expression2: AstExpression;
  prioritized: boolean;
}
