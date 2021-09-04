import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

export function parseExpressionIdentifier(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  const identifier = browser.recurse(parseIdentifier);
  if (identifier instanceof TokenImpasse) {
    return identifier;
  }
  return {
    type: AstExpressionType.Identifier,
    data: {
      name: identifier,
    },
  };
}
