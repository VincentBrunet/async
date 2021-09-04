import { AstExpression } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionCall } from "./parseExpressionCall.ts";
import { parseExpressionFunction } from "./parseExpressionFunction.ts";
import { parseExpressionIdentifier } from "./parseExpressionIdentifier.ts";
import { parseExpressionLiteral } from "./parseExpressionLiteral.ts";

export function parseExpression(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  // TODO
  const astExpressionFunction = browser.recurse(parseExpressionFunction);
  if (!(astExpressionFunction instanceof TokenImpasse)) {
    return astExpressionFunction;
  }
  const astExpressionCall = browser.recurse(parseExpressionCall);
  if (!(astExpressionCall instanceof TokenImpasse)) {
    return astExpressionCall;
  }
  const astExpressionLiteral = browser.recurse(parseExpressionLiteral);
  if (!(astExpressionLiteral instanceof TokenImpasse)) {
    return astExpressionLiteral;
  }
  const astExpressionIdentifier = browser.recurse(parseExpressionIdentifier);
  if (!(astExpressionIdentifier instanceof TokenImpasse)) {
    return astExpressionIdentifier;
  }
  return browser.impasse("Expression", [
    astExpressionFunction,
    astExpressionCall,
    astExpressionIdentifier,
  ]);
}
