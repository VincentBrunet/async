import { AstCall } from "./AstCall.ts";
import { AstFunction } from "./AstFunction.ts";
import { AstIdentifier } from "./AstIdentifier.ts";
import { AstLiteral } from "./AstLiteral.ts";
import { AstObject } from "./AstObject.ts";
import { AstOperation } from "./AstOperation.ts";

export enum AstExpressionType {
  Call = "Call",
  Identifier = "Identifier",
  Literal = "Literal",
  Function = "Function",
  Object = "Object",
  Operation = "Operation",
}

export type AstExpressionData =
  | AstCall
  | AstIdentifier
  | AstLiteral
  | AstFunction
  | AstObject
  | AstOperation;

export interface AstExpression {
  type: AstExpressionType;
  data: AstExpressionData;
}
