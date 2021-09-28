import { AstExpression, AstExpressionKind } from "../AstExpression.ts";
import { AstExpressionBinary } from "../AstExpressionBinary.ts";
import { AstExpressionCall } from "../AstExpressionCall.ts";
import { AstExpressionFunction } from "../AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../AstExpressionIdentifier.ts";
import { AstExpressionImport } from "../AstExpressionImport.ts";
import { AstExpressionLiteral } from "../AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../AstExpressionLookup.ts";
import { AstExpressionObject } from "../AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../AstExpressionRun.ts";
import { AstExpressionTyping } from "../AstExpressionTyping.ts";
import { AstExpressionUnary } from "../AstExpressionUnary.ts";

export interface ExpressionMapping<P, R> {
  caseImport: (param: P, ast: AstExpressionImport) => R;
  caseCall: (param: P, ast: AstExpressionCall) => R;
  caseIdentifier: (param: P, ast: AstExpressionIdentifier) => R;
  caseLiteral: (param: P, ast: AstExpressionLiteral) => R;
  caseFunction: (param: P, ast: AstExpressionFunction) => R;
  caseObject: (param: P, ast: AstExpressionObject) => R;
  caseRun: (param: P, ast: AstExpressionRun) => R;
  caseLookup: (param: P, ast: AstExpressionLookup) => R;
  caseUnary: (param: P, ast: AstExpressionUnary) => R;
  caseBinary: (param: P, ast: AstExpressionBinary) => R;
  caseTyping: (param: P, ast: AstExpressionTyping) => R;
  caseParenthesis: (param: P, ast: AstExpressionParenthesis) => R;
}

export function switchOnExpression<P, R>(
  astExpression: AstExpression,
  param: P,
  mapping: ExpressionMapping<P, R>,
) {
  const kind = astExpression.kind;
  const data = astExpression.data;
  switch (kind) {
    case AstExpressionKind.Import: {
      return mapping.caseImport(param, data as AstExpressionImport);
    }
    case AstExpressionKind.Call: {
      return mapping.caseCall(param, data as AstExpressionCall);
    }
    case AstExpressionKind.Identifier: {
      return mapping.caseIdentifier(param, data as AstExpressionIdentifier);
    }
    case AstExpressionKind.Literal: {
      return mapping.caseLiteral(param, data as AstExpressionLiteral);
    }
    case AstExpressionKind.Function: {
      return mapping.caseFunction(param, data as AstExpressionFunction);
    }
    case AstExpressionKind.Object: {
      return mapping.caseObject(param, data as AstExpressionObject);
    }
    case AstExpressionKind.Run: {
      return mapping.caseRun(param, data as AstExpressionRun);
    }
    case AstExpressionKind.Lookup: {
      return mapping.caseLookup(param, data as AstExpressionLookup);
    }
    case AstExpressionKind.Unary: {
      return mapping.caseUnary(param, data as AstExpressionUnary);
    }
    case AstExpressionKind.Binary: {
      return mapping.caseBinary(param, data as AstExpressionBinary);
    }
    case AstExpressionKind.Typing: {
      return mapping.caseTyping(param, data as AstExpressionTyping);
    }
    case AstExpressionKind.Parenthesis: {
      return mapping.caseParenthesis(param, data as AstExpressionParenthesis);
    }
  }
}
