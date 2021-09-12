import { AstBinary } from "../AstBinary.ts";
import { AstCall } from "../AstCall.ts";
import { AstExpression, AstExpressionKind } from "../AstExpression.ts";
import { AstFunction } from "../AstFunction.ts";
import { AstIdentifier } from "../AstIdentifier.ts";
import { AstLiteral } from "../AstLiteral.ts";
import { AstLookup } from "../AstLookup.ts";
import { AstObject } from "../AstObject.ts";
import { AstParenthesis } from "../AstParenthesis.ts";
import { AstRun } from "../AstRun.ts";
import { AstUnary } from "../AstUnary.ts";

export interface BrowseExpressionMapping<T, R> {
  browseCall: (param: T, ast: AstCall) => R;
  browseIdentifier: (param: T, ast: AstIdentifier) => R;
  browseLiteral: (param: T, ast: AstLiteral) => R;
  browseFunction: (param: T, ast: AstFunction) => R;
  browseObject: (param: T, ast: AstObject) => R;
  browseRun: (param: T, ast: AstRun) => R;
  browseLookup: (param: T, ast: AstLookup) => R;
  browseUnary: (param: T, ast: AstUnary) => R;
  browseBinary: (param: T, ast: AstBinary) => R;
  browseParenthesis: (param: T, ast: AstParenthesis) => R;
}

export function doBrowseExpression<T, R>(
  astExpression: AstExpression,
  param: T,
  mapping: BrowseExpressionMapping<T, R>,
) {
  const kind = astExpression.kind;
  const data = astExpression.data;
  switch (kind) {
    case AstExpressionKind.Call: {
      return mapping.browseCall(param, data as AstCall);
    }
    case AstExpressionKind.Identifier: {
      return mapping.browseIdentifier(param, data as AstIdentifier);
    }
    case AstExpressionKind.Literal: {
      return mapping.browseLiteral(param, data as AstLiteral);
    }
    case AstExpressionKind.Function: {
      return mapping.browseFunction(param, data as AstFunction);
    }
    case AstExpressionKind.Object: {
      return mapping.browseObject(param, data as AstObject);
    }
    case AstExpressionKind.Run: {
      return mapping.browseRun(param, data as AstRun);
    }
    case AstExpressionKind.Lookup: {
      return mapping.browseLookup(param, data as AstLookup);
    }
    case AstExpressionKind.Unary: {
      return mapping.browseUnary(param, data as AstUnary);
    }
    case AstExpressionKind.Binary: {
      return mapping.browseBinary(param, data as AstBinary);
    }
    case AstExpressionKind.Parenthesis: {
      return mapping.browseParenthesis(param, data as AstParenthesis);
    }
  }
}