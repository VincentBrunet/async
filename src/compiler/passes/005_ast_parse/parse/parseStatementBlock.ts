import { AstStatementBlock } from '../../../data/ast/AstStatementBlock.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseBlock } from './parseBlock.ts';

export function parseStatementBlock(
  browser: Browser,
): AstStatementBlock | TokenImpasse {
  // block
  const block = browser.recurse('Block', parseBlock);
  if (block instanceof TokenImpasse) {
    return browser.impasseNode(block);
  }
  // done
  return {
    block: block,
  };
}
