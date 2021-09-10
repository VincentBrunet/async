import { AstBinary } from "./AstBinary.ts";
import { AstCall } from "./AstCall.ts";
import { AstDo } from "./AstDo.ts";
import { AstFunction } from "./AstFunction.ts";
import { AstIdentifier } from "./AstIdentifier.ts";
import { AstLiteral } from "./AstLiteral.ts";
import { AstLookup } from "./AstLookup.ts";
import { AstObject } from "./AstObject.ts";
import { AstUnary } from "./AstUnary.ts";

export enum AstExpressionKind {
  Call = "Call",
  Identifier = "Identifier",
  Literal = "Literal",
  Function = "Function",
  Object = "Object",
  Do = "Do",
  Lookup = "Lookup",
  Unary = "Unary",
  Binary = "Binary",
}

export type AstExpressionData =
  | AstCall
  | AstIdentifier
  | AstLiteral
  | AstFunction
  | AstObject
  | AstDo
  | AstLookup
  | AstUnary
  | AstBinary;

export interface AstExpression {
  kind: AstExpressionKind;
  data: AstExpressionData;
}
