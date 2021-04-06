import { AstFunction } from "./AstFunction.ts";

export enum AstExpressionType {
  Identifier = "identifier",
  Function = "function",
  Call = "call",
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

export interface AstExpression {
  type: AstExpressionType;
  value: AstExpressionCall | AstExpressionIdentifier | AstExpressionFunction;
}
