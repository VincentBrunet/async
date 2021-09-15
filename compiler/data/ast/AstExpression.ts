import { AstExpressionBinary } from "./AstExpressionBinary.ts";
import { AstExpressionCall } from "./AstExpressionCall.ts";
import { AstExpressionFunction } from "./AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "./AstExpressionIdentifier.ts";
import { AstExpressionLiteral } from "./AstExpressionLiteral.ts";
import { AstExpressionLookup } from "./AstExpressionLookup.ts";
import { AstExpressionObject } from "./AstExpressionObject.ts";
import { AstExpressionParenthesis } from "./AstExpressionParenthesis.ts";
import { AstExpressionRun } from "./AstExpressionRun.ts";
import { AstExpressionUnary } from "./AstExpressionUnary.ts";

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
  | AstExpressionCall
  | AstExpressionIdentifier
  | AstExpressionLiteral
  | AstExpressionFunction
  | AstExpressionObject
  | AstExpressionRun
  | AstExpressionLookup
  | AstExpressionUnary
  | AstExpressionBinary
  | AstExpressionParenthesis;

export interface AstExpression {
  kind: AstExpressionKind;
  data: AstExpressionData;
}
