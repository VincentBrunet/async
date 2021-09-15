import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseExpressionIdentifier(
  browser: TokenBrowser,
): AstExpressionIdentifier | TokenImpasse {
  const token = browser.peek();
  if (token.kind !== TokenKind.Text) {
    return browser.impasse("Identifier");
  }
  browser.consume();
  return {
    name: token.str,
  };
}
