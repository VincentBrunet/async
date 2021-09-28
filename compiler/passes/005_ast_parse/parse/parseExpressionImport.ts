import { AstExpressionImport } from "../../../data/ast/AstExpressionImport.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionImport(
  browser: TokenBrowser,
): AstExpressionImport | TokenImpasse {
  // leyword
  const keyword = browser.peek();
  if (keyword.str !== "import") {
    return browser.impasse("ExpressionImport.Keyword");
  }
  browser.consume();

  // url
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("ExpressionImport.Url", [expression]);
  }

  // Content
  return {
    expression: expression,
  };
}
