import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionIdentifier } from "./parseExpressionIdentifier.ts";
import { parseExpressionFunction } from "./parseExpressionFunction.ts";
import { parseExpressionCall } from "./parseExpressionCall.ts";

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
  const astExpressionIdentifier = browser.recurse(parseExpressionIdentifier);
  if (!(astExpressionIdentifier instanceof TokenImpasse)) {
    return astExpressionIdentifier;
  }
  return browser.impasse("Expression", [astExpressionFunction, astExpressionCall, astExpressionIdentifier])
}
