import { AstExpression } from "./AstExpression.ts";

export interface AstOperation {
  operator: string;
  left: AstExpression;
  right: AstExpression;
}
