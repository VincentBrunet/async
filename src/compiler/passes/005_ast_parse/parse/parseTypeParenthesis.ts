import { AstTypeParenthesis } from '../../../data/ast/AstTypeParenthesis.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseType } from './parseType.ts';

export function parseTypeParenthesis(
  browser: Browser,
): AstTypeParenthesis | TokenImpasse {
  // Open
  const open = browser.peek();
  if (open.str !== '(') {
    return browser.impasseLeaf('Open', '(');
  }
  browser.consume();
  // Type
  const type = browser.recurse('Type', parseType);
  if (type instanceof TokenImpasse) {
    return browser.impasseNode(type);
  }
  // Close
  const close = browser.peek();
  if (close.str !== ')') {
    return browser.impasseLeaf('Close', ')');
  }
  browser.consume();
  // Done
  return {
    type: type,
  };
}
