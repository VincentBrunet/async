import { AstFunction } from "./AstFunction.ts";
import { AstObject } from "./AstObject.ts";

export enum AstExpressionType {
  Identifier = "identifier",
  Literal = "Literal",
  Function = "function",
  Object = "object",
  Call = "call",
  Math = "math",
}

export interface AstExpressionIdentifier {
  name: string;
}

export interface AstExpressionLiteral {
  type: string;
  value: string;
}

export interface AstExpressionFunction {
  function: AstFunction;
}

export interface AstExpressionObject {
  object: AstObject;
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
  data:
    | AstExpressionCall
    | AstExpressionIdentifier
    | AstExpressionLiteral
    | AstExpressionFunction
    | AstExpressionObject
    | AstExpressionMath;
}
