import { AstExpression,AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionParenthesis(
  stack: TokenBrowser,
): AstExpression | undefined {
  // parenthesis
  const parenthesisOpen = stack.peek();
  if (parenthesisOpen.str === "(") {
    stack.consume();
    const astExpression = stack.parse(parseExpression);
    if (astExpression === undefined) {
      stack.error("Expecting an expression");
    }
    const parenthesisClose = stack.peek();
    if (parenthesisClose.str === ")") {
      stack.consume();
      return astExpression;
    } else {
      stack.error("Expecting a closing parenthesis");
    }
  }
  // Some other kind
  return undefined;
}
