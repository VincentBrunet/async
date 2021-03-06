import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstExpressionBinary, AstExpressionBinaryOperator } from '../../../data/ast/AstExpressionBinary.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseExpression } from './parseExpression.ts';

/**
 * Support operator symbols
 */
const symbolMap = new Map<string, AstExpressionBinaryOperator>();

symbolMap.set('*', AstExpressionBinaryOperator.Multiplication);
symbolMap.set('/', AstExpressionBinaryOperator.Division);
symbolMap.set('%', AstExpressionBinaryOperator.Modulo);

symbolMap.set('+', AstExpressionBinaryOperator.Addition);
symbolMap.set('-', AstExpressionBinaryOperator.Substraction);

symbolMap.set('==', AstExpressionBinaryOperator.Equal);
symbolMap.set('!=', AstExpressionBinaryOperator.NotEqual);

symbolMap.set('<', AstExpressionBinaryOperator.Less);
symbolMap.set('<=', AstExpressionBinaryOperator.LessOrEqual);
symbolMap.set('>', AstExpressionBinaryOperator.More);
symbolMap.set('>=', AstExpressionBinaryOperator.MoreOrEqual);

symbolMap.set('&&', AstExpressionBinaryOperator.And);
symbolMap.set('||', AstExpressionBinaryOperator.Or);

symbolMap.set('=', AstExpressionBinaryOperator.Assign);

const symbolSet = new Set(symbolMap.keys());

/**
 * Do the parsing using an already-parsed left handside
 */
export function parseExpressionBinary(
  browser: Browser,
  left: AstExpression,
): AstExpressionBinary | TokenImpasse {
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
  // right
  const right = browser.recurse('Expression', parseExpression);
  if (right instanceof TokenImpasse) {
    return browser.impasseNode(right);
  }
  // done
  return {
    operator: operator,
    expression1: left,
    expression2: right,
  };
}
