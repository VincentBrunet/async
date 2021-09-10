import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";

import { TokenKind } from "../../../data/token/Token.ts";
import { AstLookup } from "../../../data/ast/AstLookup.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { AstExpressionKind } from "../../../data/ast/AstExpression.ts";

export function parseLookup(
  browser: TokenBrowser,
): AstLookup | TokenImpasse {
  // object // TODO
  const astExpression = browser.recurse(
    parseExpression,
    AstExpressionKind.Lookup,
  );
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("Lookup.Object", [astExpression]);
  }
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
