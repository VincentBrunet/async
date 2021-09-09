import { AstExpression } from "./AstExpression.ts";

export interface AstLookup {
  object: AstExpression;
  name: string;
  hash: string;
}
