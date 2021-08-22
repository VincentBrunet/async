import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseIdentifier(browser: TokenBrowser): string | TokenImpasse {
  const token = browser.peek();
  if (token.type === TokenType.Identifier) {
    browser.consume();
    return token.str;
  }
  return browser.impasse("Is not an identifier");
}
