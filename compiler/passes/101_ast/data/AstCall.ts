import { AstExpression } from "./AstExpression.ts";

export interface AstCall {
  callee: AstExpression;
  params: AstExpression[];
}
