import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

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

export interface AstExpressionBinary extends Ast {
  operator: AstExpressionBinaryOperator;
  expression1: AstExpression;
  expression2: AstExpression;

  resolvedType?: AstType;
  resolvedPrioritization?: boolean;
}
