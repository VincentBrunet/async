import { AstStatementEmpty } from "../../../data/ast/AstStatementEmpty.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseStatementEmpty(
  browser: TokenBrowser,
): AstStatementEmpty | TokenImpasse {
  // delimiter
  const delimiter = browser.peek();
  if (delimiter.str !== ";") {
    return browser.impasse("Empty.Keyword");
  }
  // Done
  return {};
}
