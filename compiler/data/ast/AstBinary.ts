import { AstExpression } from "./AstExpression.ts";

export enum AstBinaryOperator {
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

export interface AstBinary {
  operator: AstBinaryOperator;
  expression1: AstExpression;
  expression2: AstExpression;
}
