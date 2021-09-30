import {
  AstExpression,
  AstExpressionData,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionBinary } from "./parseExpressionBinary.ts";
import { parseExpressionCall } from "./parseExpressionCall.ts";
import { parseExpressionFunction } from "./parseExpressionFunction.ts";
import { parseExpressionIdentifier } from "./parseExpressionIdentifier.ts";
import { parseExpressionLiteral } from "./parseExpressionLiteral.ts";
import { parseExpressionLookup } from "./parseExpressionLookup.ts";
import { parseExpressionObject } from "./parseExpressionObject.ts";
import { parseExpressionParenthesis } from "./parseExpressionParenthesis.ts";
import { parseExpressionRun } from "./parseExpressionRun.ts";
import { parseExpressionTyping } from "./parseExpressionTyping.ts";
import { parseExpressionUnary } from "./parseExpressionUnary.ts";

function makeExpression(kind: AstExpressionKind, data: AstExpressionData) {
  return { kind: kind, data: data };
}

// Leaf expression can consume tokens right away
const leafs = new Array<
  [AstExpressionKind, (b: TokenBrowser) => AstExpressionData | TokenImpasse]
>();
leafs.push([AstExpressionKind.Unary, parseExpressionUnary]);
leafs.push([AstExpressionKind.Parenthesis, parseExpressionParenthesis]);
leafs.push([AstExpressionKind.Function, parseExpressionFunction]);
leafs.push([AstExpressionKind.Object, parseExpressionObject]);
leafs.push([AstExpressionKind.Run, parseExpressionRun]);
leafs.push([AstExpressionKind.Literal, parseExpressionLiteral]);
leafs.push([AstExpressionKind.Identifier, parseExpressionIdentifier]);

// Left recursion expressions require look-ahead
const recursors = new Array<
  [
    AstExpressionKind,
    (b: TokenBrowser, left: AstExpression) => AstExpressionData | TokenImpasse,
  ]
>();
recursors.push([AstExpressionKind.Call, parseExpressionCall]);
recursors.push([AstExpressionKind.Lookup, parseExpressionLookup]);
recursors.push([AstExpressionKind.Binary, parseExpressionBinary]);
recursors.push([AstExpressionKind.Typing, parseExpressionTyping]);

/**
 * Parse
 */
export function parseExpression(
  browser: TokenBrowser,
  leafOnly?: boolean,
): AstExpression | TokenImpasse {
  // Start with a simple leaf expression
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

  // Then do a right recursion
  let astCurrent = astLeft;
  let keepRecursing = !leafOnly;
  while (keepRecursing) {
    keepRecursing = false;
    for (const recursor of recursors) {
      const astResult = browser.recurse<
        AstExpressionData,
        AstExpression | undefined
      >(
        recursor[1] as any, // wut type-mess
        astCurrent,
      );
      if (astResult instanceof TokenImpasse) {
        // no-op
      } else {
        keepRecursing = true;
        astCurrent = makeExpression(recursor[0], astResult);
      }
    }
  }

  // Keep the latest proper expression
  return astCurrent;
}
