import {
  AstExpression,
  AstExpressionData,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBinary } from "./parseBinary.ts";
import { parseCall } from "./parseCall.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";
import { parseLiteral } from "./parseLiteral.ts";
import { parseLookup } from "./parseLookup.ts";
import { parseObject } from "./parseObject.ts";
import { parseParenthesis } from "./parseParenthesis.ts";
import { parseRun } from "./parseRun.ts";

function makeExpression(kind: AstExpressionKind, data: AstExpressionData) {
  return { kind: kind, data: data };
}

const leafs = new Array<
  [AstExpressionKind, (b: TokenBrowser) => AstExpressionData | TokenImpasse]
>();
leafs.push([AstExpressionKind.Parenthesis, parseParenthesis]);
leafs.push([AstExpressionKind.Function, parseFunction]);
leafs.push([AstExpressionKind.Object, parseObject]);
leafs.push([AstExpressionKind.Run, parseRun]);
leafs.push([AstExpressionKind.Literal, parseLiteral]);
leafs.push([AstExpressionKind.Identifier, parseIdentifier]);

const recursors = new Array<
  [
    AstExpressionKind,
    (b: TokenBrowser, left: AstExpression) => AstExpressionData | TokenImpasse,
  ]
>();

recursors.push([AstExpressionKind.Call, parseCall]);
recursors.push([AstExpressionKind.Lookup, parseLookup]);
recursors.push([AstExpressionKind.Binary, parseBinary]);

export function parseExpression(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  // Simple leaf expressions
  const astImpasses = new Array<TokenImpasse>();
  let astLeft: AstExpression | undefined;
  for (const leaf of leafs) {
    const astResult = browser.recurse(leaf[1]);
    if (astResult instanceof TokenImpasse) {
      astImpasses.push(astResult);
    } else {
      astLeft = makeExpression(leaf[0], astResult);
      break;
    }
  }
  if (astLeft === undefined) {
    return browser.impasse("Expression", astImpasses);
  }

  // Left recursion part
  let astCurrent = astLeft;
  let modified = true;
  while (modified) {
    modified = false;
    for (const recursor of recursors) {
      const astResult = browser.recurse<
        AstExpressionData,
        AstExpression | undefined
      >(
        recursor[1] as any, // wut
        astCurrent,
      );
      if (astResult instanceof TokenImpasse) {
        // no-op
      } else {
        modified = true;
        astCurrent = makeExpression(recursor[0], astResult);
      }
    }
  }

  // Keep the latest proper expression
  return astCurrent;
}
