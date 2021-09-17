import { AstTypeFunction } from "../../../data/ast/AstTypeFunction.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseTypeFunction(
  browser: TokenBrowser,
): AstTypeFunction | TokenImpasse {
  // read identifier
  const name = browser.peek();
  if (name.kind !== TokenKind.Text) {
    return browser.impasse("TypeFunction");
  }
  browser.consume();

  // TODO - template?
  return browser.impasse("TypeFunction.TODO");
}
