import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstIdentifier } from "../data/AstIdentifier.ts";
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
