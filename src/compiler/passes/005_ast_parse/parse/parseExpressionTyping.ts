import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstExpressionTyping, AstExpressionTypingOperator } from '../../../data/ast/AstExpressionTyping.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseType } from './parseType.ts';

/**
 * Support operator symbols
 */
const symbolMap = new Map<string, AstExpressionTypingOperator>();

symbolMap.set('is', AstExpressionTypingOperator.Is);
symbolMap.set('as', AstExpressionTypingOperator.As);

const symbolSet = new Set(symbolMap.keys());

/**
 * Do the parsing using an already-parsed left handside
 */
export function parseExpressionTyping(
  browser: Browser,
  expression: AstExpression,
): AstExpressionTyping | TokenImpasse {
  // operator
  const operator1 = browser.peek(0).str;
  const operator2 = browser.peek(1).str;
  let operator = symbolMap.get(operator1 + operator2);
  let consumed = 2;
  if (operator === undefined) {
    operator = symbolMap.get(operator1);
    consumed = 1;
  }
  if (operator === undefined) {
    return browser.impasseLeaf('Operator', symbolSet);
  }
  for (let i = 0; i < consumed; i++) {
    browser.consume();
  }
  // type
  const type = browser.recurse('Type', parseType);
  if (type instanceof TokenImpasse) {
    return browser.impasseNode(type);
  }
  // done
  return {
    operator: operator,
    expression: expression,
    type: type,
  };
}
