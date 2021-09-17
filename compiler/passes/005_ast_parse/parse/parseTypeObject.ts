import { AstTypeObject } from "../../../data/ast/AstTypeObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseTypeObject(
  browser: TokenBrowser,
): AstTypeObject | TokenImpasse {
  // read identifier
  const name = browser.peek();
  if (name.kind !== TokenKind.Text) {
    return browser.impasse("TypeObject");
  }
  browser.consume();

  // TODO - template?
  return browser.impasse("TypeObject.TODO");
}
