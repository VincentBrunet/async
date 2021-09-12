import { AstExpression } from "./AstExpression.ts";

export enum AstBinaryOperator {
  Addition = "Addition",
  Substraction = "Substraction",
  Multiplication = "Multiplication",
  Division = "Division",
  Modulo = "Modulo",
}

export interface AstBinary {
  operator: AstBinaryOperator;
  expression1: AstExpression;
  expression2: AstExpression;
}
