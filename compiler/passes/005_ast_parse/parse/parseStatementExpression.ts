import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementExpression(
  browser: TokenBrowser,
): AstStatementExpression | TokenImpasse {
  // expression
  const astExpression = browser.recurse(parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("Statement.Expression", [astExpression]);
  }
  // done
  return {
    expression: astExpression,
  };
}
