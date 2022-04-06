import { AstStatementCondition } from '../../../data/ast/AstStatementCondition.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseBlock } from './parseBlock.ts';
import { parseExpression } from './parseExpression.ts';

export function parseStatementCondition(
  browser: Browser,
): AstStatementCondition | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== 'if') {
    return browser.impasseLeaf('Keyword', 'if');
  }
  browser.consume();
  // expression
  const astCondition = browser.recurse('Expression', parseExpression);
  if (astCondition instanceof TokenImpasse) {
    return browser.impasseNode(astCondition);
  }
  // block
  const astBlock = browser.recurse('Block', parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasseNode(astBlock);
  }
  // done
  return {
    branches: [{
      condition: astCondition,
      block: astBlock,
    }],
  };
}
