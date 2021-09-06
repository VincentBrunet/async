import {
  AstExpression,
  AstExpressionData,
  AstExpressionType,
} from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseCall } from "./parseCall.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";
import { parseLiteral } from "./parseLiteral.ts";
import { parseObject } from "./parseObject.ts";
import { parseParenthesis } from "./parseParenthesis.ts";

function makeExpression(type: AstExpressionType, data: AstExpressionData) {
  return {
    type: type,
    data: data,
  };
}

export function parseExpression(
  browser: TokenBrowser,
  cutoff?: AstExpressionType,
): AstExpression | TokenImpasse {
  const astImpasses = new Array<TokenImpasse>();

  // Parenthesis
  const astParenthesis = browser.recurse(parseParenthesis);
  if (astParenthesis instanceof TokenImpasse) {
    astImpasses.push(astParenthesis);
  } else {
    return astParenthesis;
  }

  // Function
  const astFunction = browser.recurse(parseFunction);
  if (astFunction instanceof TokenImpasse) {
    astImpasses.push(astFunction);
  } else {
    return makeExpression(AstExpressionType.Function, astFunction);
  }

  // Object
  const astObject = browser.recurse(parseObject);
  if (astObject instanceof TokenImpasse) {
    astImpasses.push(astObject);
  } else {
    return makeExpression(AstExpressionType.Object, astObject);
  }

  // Call
  if (cutoff !== AstExpressionType.Call) {
    const astCall = browser.recurse(parseCall);
    if (astCall instanceof TokenImpasse) {
      astImpasses.push(astCall);
    } else {
      return makeExpression(AstExpressionType.Call, astCall);
    }
  }

  // Literal
  const astLiteral = browser.recurse(parseLiteral);
  if (astLiteral instanceof TokenImpasse) {
    astImpasses.push(astLiteral);
  } else {
    return makeExpression(AstExpressionType.Literal, astLiteral);
  }

  // Identifier
  const astIdentifier = browser.recurse(parseIdentifier);
  if (astIdentifier instanceof TokenImpasse) {
    astImpasses.push(astIdentifier);
  } else {
    return makeExpression(AstExpressionType.Identifier, astIdentifier);
  }

  return browser.impasse("Expression", astImpasses);
}
