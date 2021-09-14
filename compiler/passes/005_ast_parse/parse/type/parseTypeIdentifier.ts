import { AstTypeIdentifier } from "../../../../data/ast/type/AstTypeIdentifier.ts";
import { TokenKind } from "../../../../data/token/Token.ts";
import { TokenBrowser } from "../../util/TokenBrowser.ts";
import { TokenImpasse } from "../../util/TokenImpasse.ts";

export function parseTypeIdentifier(
  browser: TokenBrowser,
): AstTypeIdentifier | TokenImpasse {
  // read identifier
  const name = browser.peek();
  if (name.kind !== TokenKind.Text) {
    return browser.impasse("TypeIdentifier");
  }
  browser.consume();

  // TODO - template?

  // done
  return {
    name: name.str,
  };
}
