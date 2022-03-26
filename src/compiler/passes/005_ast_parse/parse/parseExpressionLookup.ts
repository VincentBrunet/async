import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstExpressionLookup } from '../../../data/ast/AstExpressionLookup.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { hashObjectKey } from '../../../passes/hash/hashObjectKey.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';

export function parseExpressionLookup(
  browser: Browser,
  astExpression: AstExpression,
): AstExpressionLookup | TokenImpasse {
  // dot (required)
  const delim = browser.peek();
  if (delim.str !== '.') {
    return browser.impasse('Lookup.Dot');
  }
  browser.consume();
  // name (required)
  const key = browser.peek();
  if (!tokenIsText(key)) {
    return browser.impasse('Lookup.Key');
  }
  browser.consume();
  const name = key.str;
  // hashed name
  const hash = hashObjectKey(name);
  // done
  return {
    expression: astExpression,
    name: name,
    hash: hash,
  };
}
