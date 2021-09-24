import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionLookup {
  expression: AstExpression;
  name: string;
  hash: string;

  resolvedType?: AstType;
}
