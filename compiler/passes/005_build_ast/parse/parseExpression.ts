import {
  AstExpression,
  AstExpressionData,
  AstExpressionKind,
} from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseCall } from "./parseCall.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";
import { parseLiteral } from "./parseLiteral.ts";
import { parseLookup } from "./parseLookup.ts";
import { parseObject } from "./parseObject.ts";
import { parseParenthesis } from "./parseParenthesis.ts";

function makeExpression(kind: AstExpressionKind, data: AstExpressionData) {
  return {
    kind: kind,
    data: data,
  };
}

export function parseExpression(
  browser: TokenBrowser,
  cutoff?: AstExpressionKind,
): AstExpression | TokenImpasse {
  const astImpasses = new Array<TokenImpasse>();

  // Lookup
  if (
    cutoff !== AstExpressionKind.Call && cutoff !== AstExpressionKind.Lookup
  ) {
    const astLookup = browser.recurse(parseLookup);
    if (astLookup instanceof TokenImpasse) {
      astImpasses.push(astLookup);
    } else {
      return makeExpression(AstExpressionKind.Lookup, astLookup);
    }
  }

  // Call
  if (cutoff !== AstExpressionKind.Call) {
    const astCall = browser.recurse(parseCall);
    if (astCall instanceof TokenImpasse) {
      astImpasses.push(astCall);
    } else {
      return makeExpression(AstExpressionKind.Call, astCall);
    }
  }

  // Function
  const astFunction = browser.recurse(parseFunction);
  if (astFunction instanceof TokenImpasse) {
    astImpasses.push(astFunction);
  } else {
    return makeExpression(AstExpressionKind.Function, astFunction);
  }

  // Object
  const astObject = browser.recurse(parseObject);
  if (astObject instanceof TokenImpasse) {
    astImpasses.push(astObject);
  } else {
    return makeExpression(AstExpressionKind.Object, astObject);
  }

  // Literal
  const astLiteral = browser.recurse(parseLiteral);
  if (astLiteral instanceof TokenImpasse) {
    astImpasses.push(astLiteral);
  } else {
    return makeExpression(AstExpressionKind.Literal, astLiteral);
  }

  // Identifier
  const astIdentifier = browser.recurse(parseIdentifier);
  if (astIdentifier instanceof TokenImpasse) {
    astImpasses.push(astIdentifier);
  } else {
    return makeExpression(AstExpressionKind.Identifier, astIdentifier);
  }

  // Parenthesis
  const astParenthesis = browser.recurse(parseParenthesis);
  if (astParenthesis instanceof TokenImpasse) {
    astImpasses.push(astParenthesis);
  } else {
    return astParenthesis;
  }

  return browser.impasse("Expression", astImpasses);
}
