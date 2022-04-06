import { AstStatementEmpty } from '../../../data/ast/AstStatementEmpty.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';

export function parseStatementEmpty(
  browser: Browser,
): AstStatementEmpty | TokenImpasse {
  // delimiter
  const delimiter = browser.peek();
  if (delimiter.str !== ';') {
    return browser.impasseLeaf('Keyword', ';');
  }
  // Done
  return {};
}
