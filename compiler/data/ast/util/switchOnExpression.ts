import {
  AstExpression,
  AstExpressionKind,
} from "../expression/AstExpression.ts";
import { AstExpressionBinary } from "../expression/AstExpressionBinary.ts";
import { AstExpressionCall } from "../expression/AstExpressionCall.ts";
import { AstExpressionFunction } from "../expression/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../expression/AstExpressionIdentifier.ts";
import { AstExpressionLiteral } from "../expression/AstExpressionLiteral.ts";
import { AstExpressionLookup } from "../expression/AstExpressionLookup.ts";
import { AstExpressionObject } from "../expression/AstExpressionObject.ts";
import { AstExpressionParenthesis } from "../expression/AstExpressionParenthesis.ts";
import { AstExpressionRun } from "../expression/AstExpressionRun.ts";
import { AstExpressionUnary } from "../expression/AstExpressionUnary.ts";

export interface ExpressionMapping<P, R> {
  caseCall: (param: P, ast: AstExpressionCall) => R;
  caseIdentifier: (param: P, ast: AstExpressionIdentifier) => R;
  caseLiteral: (param: P, ast: AstExpressionLiteral) => R;
  caseFunction: (param: P, ast: AstExpressionFunction) => R;
  caseObject: (param: P, ast: AstExpressionObject) => R;
  caseRun: (param: P, ast: AstExpressionRun) => R;
  caseLookup: (param: P, ast: AstExpressionLookup) => R;
  caseUnary: (param: P, ast: AstExpressionUnary) => R;
  caseBinary: (param: P, ast: AstExpressionBinary) => R;
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
    case AstExpressionKind.Parenthesis: {
      return mapping.caseParenthesis(param, data as AstExpressionParenthesis);
    }
  }
}
