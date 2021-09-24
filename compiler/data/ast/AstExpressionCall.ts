import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionCall {
  callee: AstExpression;
  params: Array<AstExpression>;

  resolvedType?: AstType;
}
