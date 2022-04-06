import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';
import { parseBlock } from './parseBlock.ts';

export function parseExpressionRun(
  browser: Browser,
): AstExpressionRun | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== 'expr') {
    return browser.impasseLeaf('Keyword', 'expr');
  }
  browser.consume();
  // type annotation
  const astAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(astAnnotation);
  }
  // block
  const astBlock = browser.recurse('Block', parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasseNode(astBlock);
  }
  // done
  return {
    annotation: astAnnotation,
    block: astBlock,
  };
}
