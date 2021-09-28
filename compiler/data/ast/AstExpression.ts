import { Ast } from "./Ast.ts";
import { AstExpressionBinary } from "./AstExpressionBinary.ts";
import { AstExpressionCall } from "./AstExpressionCall.ts";
import { AstExpressionFunction } from "./AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "./AstExpressionIdentifier.ts";
import { AstExpressionImport } from "./AstExpressionImport.ts";
import { AstExpressionLiteral } from "./AstExpressionLiteral.ts";
import { AstExpressionLookup } from "./AstExpressionLookup.ts";
import { AstExpressionObject } from "./AstExpressionObject.ts";
import { AstExpressionParenthesis } from "./AstExpressionParenthesis.ts";
import { AstExpressionRun } from "./AstExpressionRun.ts";
import { AstExpressionTyping } from "./AstExpressionTyping.ts";
import { AstExpressionUnary } from "./AstExpressionUnary.ts";
import { AstType } from "./AstType.ts";

export enum AstExpressionKind {
  Import = "Import",
  Call = "Call",
  Identifier = "Identifier",
  Literal = "Literal",
  Function = "Function",
  Object = "Object",
  Run = "Run",
  Lookup = "Lookup",
  Unary = "Unary",
  Binary = "Binary",
  Typing = "Typing",
  Parenthesis = " Parenthesis",
}

export type AstExpressionData =
  | AstExpressionImport
  | AstExpressionCall
  | AstExpressionIdentifier
  | AstExpressionLiteral
  | AstExpressionFunction
  | AstExpressionObject
  | AstExpressionRun
  | AstExpressionLookup
  | AstExpressionUnary
  | AstExpressionBinary
  | AstExpressionTyping
  | AstExpressionParenthesis;

export interface AstExpression extends Ast {
  kind: AstExpressionKind;
  data: AstExpressionData;

  resolvedType?: AstType;
}
