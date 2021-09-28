import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hash64 } from "../../../lib/core/strings/hash64.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseExpressionLookup(
  browser: TokenBrowser,
  astExpression: AstExpression,
): AstExpressionLookup | TokenImpasse {
  // dot (required)
  const delim = browser.peek();
  if (delim.str !== ".") {
    return browser.impasse("Lookup.Dot");
  }
  browser.consume();

  // name (required)
  const key = browser.peek();
  if (key.kind !== TokenKind.Text) {
    return browser.impasse("Lookup.Key");
  }
  browser.consume();
  const name = key.str;

  // hashed name
  const hash = hash64(name);

  // done
  return {
    expression: astExpression,
    name: name,
    hash: hash,
  };
}
