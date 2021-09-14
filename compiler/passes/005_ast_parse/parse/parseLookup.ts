import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";
import { AstExpression } from "../../../data/ast/expression/AstExpression.ts";
import { AstExpressionLookup } from "../../../data/ast/expression/AstExpressionLookup.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseLookup(
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
  const sha256 = createHash("sha256").update(name).toString();
  const hash = "0x" + sha256.slice(0, 16).toUpperCase();
  // done
  return {
    expression: astExpression,
    name: name,
    hash: hash,
  };
}
