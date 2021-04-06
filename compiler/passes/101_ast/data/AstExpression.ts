import { AstFunction } from "./AstFunction.ts";

export enum AstExpressionType {
  Identifier = "identifier",
  Function = "function",
  Call = "call",
  Math = "math",
}

export interface AstExpressionIdentifier {
  name: string;
}

export interface AstExpressionFunction {
  function: AstFunction;
}

export interface AstExpressionCall {
  callee: AstExpression;
  params: AstExpression[];
}

export interface AstExpressionMath {
  operator: string;
  left: AstExpression;
  right: AstExpression;
}

export interface AstExpression {
  type: AstExpressionType;
  value:
    | AstExpressionCall
    | AstExpressionIdentifier
    | AstExpressionFunction
    | AstExpressionMath;
}
