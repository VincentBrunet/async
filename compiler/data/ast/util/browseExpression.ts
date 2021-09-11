import { AstBinary } from "../AstBinary.ts";
import { AstCall } from "../AstCall.ts";
import { AstExpression, AstExpressionKind } from "../AstExpression.ts";
import { AstFunction } from "../AstFunction.ts";
import { AstIdentifier } from "../AstIdentifier.ts";
import { AstLiteral } from "../AstLiteral.ts";
import { AstLookup } from "../AstLookup.ts";
import { AstObject } from "../AstObject.ts";
import { AstRun } from "../AstRun.ts";
import { AstUnary } from "../AstUnary.ts";

export interface BrowserExpression<T> {
  browseCall: (param: T, ast: AstCall) => void;
  browseIdentifier: (param: T, ast: AstIdentifier) => void;
  browseLiteral: (param: T, ast: AstLiteral) => void;
  browseFunction: (param: T, ast: AstFunction) => void;
  browseObject: (param: T, ast: AstObject) => void;
  browseRun: (param: T, ast: AstRun) => void;
  browseLookup: (param: T, ast: AstLookup) => void;
  browseUnary: (param: T, ast: AstUnary) => void;
  browseBinary: (param: T, ast: AstBinary) => void;
}

export function browseExpression<T>(
  astExpression: AstExpression,
  param: T,
  browser: BrowserExpression<T>,
) {
  switch (astExpression.kind) {
    case AstExpressionKind.Call: {
      browser.browseCall(param, astExpression.data as AstCall);
      break;
    }
    case AstExpressionKind.Identifier: {
      browser.browseIdentifier(param, astExpression.data as AstIdentifier);
      break;
    }
    case AstExpressionKind.Literal: {
      browser.browseLiteral(param, astExpression.data as AstLiteral);
      break;
    }
    case AstExpressionKind.Function: {
      browser.browseFunction(param, astExpression.data as AstFunction);
      break;
    }
    case AstExpressionKind.Object: {
      browser.browseObject(param, astExpression.data as AstObject);
      break;
    }
    case AstExpressionKind.Run: {
      browser.browseRun(param, astExpression.data as AstRun);
      break;
    }
    case AstExpressionKind.Lookup: {
      browser.browseLookup(param, astExpression.data as AstLookup);
      break;
    }
    case AstExpressionKind.Unary: {
      browser.browseUnary(param, astExpression.data as AstUnary);
      break;
    }
    case AstExpressionKind.Binary: {
      browser.browseBinary(param, astExpression.data as AstBinary);
      break;
    }
  }
}
