import { AstExpression } from "./AstExpression.ts";

export interface AstLookup {
  expression: AstExpression;
  name: string;
  hash: string;
}
