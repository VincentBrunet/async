import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionParenthesis(
  browser: Browser,
): AstExpressionParenthesis | TokenImpasse {
  // Open
  const parenthesisOpen = browser.peek();
  if (parenthesisOpen.str !== "(") {
    return browser.impasse("Parenthesis.Opening");
  }
  browser.consume();
  // Expression
  const astExpression = browser.recurse(parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("Parenthesis.Expression", [astExpression]);
  }
  // Close
  const parenthesisClose = browser.peek();
  if (parenthesisClose.str !== ")") {
    return browser.impasse("Parenthesis.Closing");
  }
  browser.consume();
  // Done
  return {
    expression: astExpression,
  };
}
