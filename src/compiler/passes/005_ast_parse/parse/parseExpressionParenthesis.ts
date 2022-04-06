import { AstExpressionParenthesis } from '../../../data/ast/AstExpressionParenthesis.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseExpression } from './parseExpression.ts';

export function parseExpressionParenthesis(
  browser: Browser,
): AstExpressionParenthesis | TokenImpasse {
  // Open
  const parenthesisOpen = browser.peek();
  if (parenthesisOpen.str !== '(') {
    return browser.impasseLeaf('Open', '(');
  }
  browser.consume();
  // Expression
  const astExpression = browser.recurse('Expression', parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasseNode(astExpression);
  }
  // Close
  const parenthesisClose = browser.peek();
  if (parenthesisClose.str !== ')') {
    return browser.impasseLeaf('Close', ')');
  }
  browser.consume();
  // Done
  return {
    expression: astExpression,
  };
}
