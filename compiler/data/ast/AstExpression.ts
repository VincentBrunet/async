import { AstBinary } from "./AstBinary.ts";
import { AstCall } from "./AstCall.ts";
import { AstFunction } from "./AstFunction.ts";
import { AstIdentifier } from "./AstIdentifier.ts";
import { AstLiteral } from "./AstLiteral.ts";
import { AstLookup } from "./AstLookup.ts";
import { AstObject } from "./AstObject.ts";
import { AstParenthesis } from "./AstParenthesis.ts";
import { AstRun } from "./AstRun.ts";
import { AstUnary } from "./AstUnary.ts";

export enum AstExpressionKind {
  Call = "Call",
  Identifier = "Identifier",
  Literal = "Literal",
  Function = "Function",
  Object = "Object",
  Run = "Run",
  Lookup = "Lookup",
  Unary = "Unary",
  Binary = "Binary",
  Parenthesis = " Parenthesis",
}

export type AstExpressionData =
  | AstCall
  | AstIdentifier
  | AstLiteral
  | AstFunction
  | AstObject
  | AstRun
  | AstLookup
  | AstUnary
  | AstBinary
  | AstParenthesis;

export interface AstExpression {
  kind: AstExpressionKind;
  data: AstExpressionData;
}
