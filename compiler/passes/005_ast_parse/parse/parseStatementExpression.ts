import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementExpression(
  browser: TokenBrowser,
): AstStatementExpression | TokenImpasse {
  // expression
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("Statement.Expression", [expression]);
  }
  // done
  return {
    expression: expression,
  };
}
