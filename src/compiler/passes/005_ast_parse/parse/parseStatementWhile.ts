import { AstStatementWhile } from '../../../data/ast/AstStatementWhile.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseBlock } from './parseBlock.ts';
import { parseExpression } from './parseExpression.ts';

export function parseStatementWhile(
  browser: Browser,
): AstStatementWhile | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== 'while') {
    return browser.impasseLeaf('Keyword', 'while');
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
    condition: astCondition,
    block: astBlock,
  };
}
