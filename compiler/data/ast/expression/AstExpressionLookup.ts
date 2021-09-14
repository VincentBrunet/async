import { AstExpression } from "./AstExpression.ts";

export interface AstExpressionLookup {
  expression: AstExpression;
  name: string;
  hash: string;
}
