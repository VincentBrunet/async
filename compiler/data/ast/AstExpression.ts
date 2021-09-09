import { AstCall } from "./AstCall.ts";
import { AstFunction } from "./AstFunction.ts";
import { AstIdentifier } from "./AstIdentifier.ts";
import { AstLiteral } from "./AstLiteral.ts";
import { AstLookup } from "./AstLookup.ts";
import { AstObject } from "./AstObject.ts";
import { AstOperation } from "./AstOperation.ts";

export enum AstExpressionKind {
  Call = "Call",
  Identifier = "Identifier",
  Literal = "Literal",
  Function = "Function",
  Object = "Object",
  Lookup = "Lookup",
  Operation = "Operation",
}

export type AstExpressionData =
  | AstCall
  | AstIdentifier
  | AstLiteral
  | AstFunction
  | AstObject
  | AstLookup
  | AstOperation;

export interface AstExpression {
  kind: AstExpressionKind;
  data: AstExpressionData;
}
