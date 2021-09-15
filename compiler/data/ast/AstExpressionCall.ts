import { AstExpression } from "./AstExpression.ts";

export interface AstExpressionCall {
  callee: AstExpression;
  params: Array<AstExpression>;
}
