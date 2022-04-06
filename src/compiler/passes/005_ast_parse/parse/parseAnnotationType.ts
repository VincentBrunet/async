import { AstAnnotationType } from '../../../data/ast/AstAnnotationType.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseType } from './parseType.ts';

export function parseAnnotationType(
  browser: Browser,
): AstAnnotationType | TokenImpasse {
  // type annotation symbol
  const keyword = browser.peek();
  if (keyword.str !== ':') {
    return {};
  }
  browser.consume();
  // actual type content
  const astType = browser.recurse('Type', parseType);
  if (astType instanceof TokenImpasse) {
    return browser.impasseNode(astType);
  }
  // done
  return {
    type: astType,
  };
}
