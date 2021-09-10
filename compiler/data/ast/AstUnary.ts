import { AstExpression } from "./AstExpression.ts";

export interface AstUnary {
  operator: string;
  expression: AstExpression;
}
