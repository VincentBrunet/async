import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionIdentifier } from "./parseExpressionIdentifier.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

export function parseExpression(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  // TODO
  return browser.recurse(parseExpressionIdentifier);
}
