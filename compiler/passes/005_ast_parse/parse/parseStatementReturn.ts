import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementReturn(
  browser: TokenBrowser,
): AstStatementReturn | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== "return") {
    return browser.impasse("Return.Keyword");
  }
  browser.consume();
  // type
  const astExpression = browser.recurse(parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("Return.Expression", [astExpression]);
  }
  // done
  return {
    expression: astExpression,
  };
}
