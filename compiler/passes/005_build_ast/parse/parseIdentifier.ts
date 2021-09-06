import { TokenType } from "../../../data/token/TokenType.ts";
import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseIdentifier(
  browser: TokenBrowser,
): AstIdentifier | TokenImpasse {
  const token = browser.peek();
  if (token.type !== TokenType.Text) {
    return browser.impasse("Identifier");
  }
  browser.consume();
  return {
    name: token.str,
  };
}
