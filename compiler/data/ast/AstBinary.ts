import { AstExpression } from "./AstExpression.ts";

export interface AstBinary {
  operator: string;
  expression1: AstExpression;
  expression2: AstExpression;
}
