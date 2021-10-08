import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseStatementExport(
  browser: TokenBrowser,
): AstStatementExport | TokenImpasse {
  // keyword - export
  const keyword = browser.peek();
  if (keyword.str !== "export") {
    return browser.impasse("StatementExport.KeywordExport");
  }
  browser.consume();
  // actual statement
  const statement = browser.recurse(parseStatement);
  if (statement instanceof TokenImpasse) {
    return browser.impasse("StatementExport.Statement", [statement]);
  }
  // done
  return {
    statement: statement,
  };
}
