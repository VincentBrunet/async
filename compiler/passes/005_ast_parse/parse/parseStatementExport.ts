import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseStatementExport(
  browser: Browser,
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
