import { AstExpressionUnary, AstExpressionUnaryOperator } from '../../../data/ast/AstExpressionUnary.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseExpression } from './parseExpression.ts';

const symbolMap = new Map<string, AstExpressionUnaryOperator>();
symbolMap.set('+', AstExpressionUnaryOperator.Positive);
symbolMap.set('-', AstExpressionUnaryOperator.Negative);
symbolMap.set('!', AstExpressionUnaryOperator.Not);

const symbolSet = new Set(symbolMap.keys());

export function parseExpressionUnary(
  browser: Browser,
): AstExpressionUnary | TokenImpasse {
  // operator
  const operator = symbolMap.get(browser.peek().str);
  if (operator !== undefined) {
    browser.consume();
  } else {
    return browser.impasseLeaf('Operator', symbolSet);
  }
  // Expression
  const expression = browser.recurseWithParam('Expression', parseExpression, true);
  if (expression instanceof TokenImpasse) {
    return browser.impasseNode(expression);
  }
  // done
  return {
    operator: operator,
    expression: expression,
  };
}
