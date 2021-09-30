import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementImport(
  browser: TokenBrowser,
): AstStatementImport | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== "import") {
    return browser.impasse("StatementImport.Keyword");
  }
  browser.consume();

  // source url
  const from = browser.recurse(parseExpression);
  if (from instanceof TokenImpasse) {
    return browser.impasse("StatementImport.Url", [from]);
  }

  // Content
  return {
    slots: [],
    from: from,
  };
}
