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

export interface BrowseExpressionMapping<P, R> {
  browseCall: (param: P, ast: AstExpressionCall) => R;
  browseIdentifier: (param: P, ast: AstExpressionIdentifier) => R;
  browseLiteral: (param: P, ast: AstExpressionLiteral) => R;
  browseFunction: (param: P, ast: AstExpressionFunction) => R;
  browseObject: (param: P, ast: AstExpressionObject) => R;
  browseRun: (param: P, ast: AstExpressionRun) => R;
  browseLookup: (param: P, ast: AstExpressionLookup) => R;
  browseUnary: (param: P, ast: AstExpressionUnary) => R;
  browseBinary: (param: P, ast: AstExpressionBinary) => R;
  browseParenthesis: (param: P, ast: AstExpressionParenthesis) => R;
}

export function doBrowseExpression<P, R>(
  astExpression: AstExpression,
  param: P,
  mapping: BrowseExpressionMapping<P, R>,
) {
  const kind = astExpression.kind;
  const data = astExpression.data;
  switch (kind) {
    case AstExpressionKind.Call: {
      return mapping.browseCall(param, data as AstExpressionCall);
    }
    case AstExpressionKind.Identifier: {
      return mapping.browseIdentifier(param, data as AstExpressionIdentifier);
    }
    case AstExpressionKind.Literal: {
      return mapping.browseLiteral(param, data as AstExpressionLiteral);
    }
    case AstExpressionKind.Function: {
      return mapping.browseFunction(param, data as AstExpressionFunction);
    }
    case AstExpressionKind.Object: {
      return mapping.browseObject(param, data as AstExpressionObject);
    }
    case AstExpressionKind.Run: {
      return mapping.browseRun(param, data as AstExpressionRun);
    }
    case AstExpressionKind.Lookup: {
      return mapping.browseLookup(param, data as AstExpressionLookup);
    }
    case AstExpressionKind.Unary: {
      return mapping.browseUnary(param, data as AstExpressionUnary);
    }
    case AstExpressionKind.Binary: {
      return mapping.browseBinary(param, data as AstExpressionBinary);
    }
    case AstExpressionKind.Parenthesis: {
      return mapping.browseParenthesis(param, data as AstExpressionParenthesis);
    }
  }
}
