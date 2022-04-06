import { AstTypeIdentifier } from '../../../data/ast/AstTypeIdentifier.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseType } from './parseType.ts';

const templateOpen = new Set(['<']);
const templateClose = new Set(['>']);
const templateDelim = new Set([',']);

export function parseTypeIdentifier(
  browser: Browser,
): AstTypeIdentifier | TokenImpasse {
  // read native
  const name = browser.peek();
  if (!tokenIsText(name)) {
    return browser.impasseLeaf('Name', 'an identifier');
  }
  browser.consume();
  // param
  const params = browser.recurseArray(
    'Type',
    false,
    templateOpen,
    templateClose,
    templateDelim,
    parseType,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasseNode(params);
  }
  // done
  return {
    name: name.str,
    params: params,
  };
}
