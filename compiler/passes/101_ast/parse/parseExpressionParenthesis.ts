import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionParenthesis(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  // parenthesis
  const parenthesisOpen = browser.peek();
  if (parenthesisOpen.str === "(") {
    browser.consume();
    const astExpression = browser.recurse(parseExpression);
    if (astExpression instanceof TokenImpasse) {
      return browser.impasse("Expression", [astExpression]);
    }
    const parenthesisClose = browser.peek();
    if (parenthesisClose.str === ")") {
      browser.consume();
      return astExpression;
    } else {
      return browser.impasse("Closing parenthesis");
    }
  }
  // Some other kind
  return browser.impasse("Not a parenthesis expression");
}
