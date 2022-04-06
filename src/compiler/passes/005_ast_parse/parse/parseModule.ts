import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseBlock } from './parseBlock.ts';

export function parseModule(
  browser: Browser,
  moduleHash?: string,
): AstModule | TokenImpasse {
  // Asserts
  const hash = ensure(moduleHash);
  // Content
  const block = browser.recurseWithParam('Block', parseBlock, true);
  if (block instanceof TokenImpasse) {
    return browser.impasseNode(block);
  }
  // done
  return {
    hash: hash,
    block: block,
  };
}
