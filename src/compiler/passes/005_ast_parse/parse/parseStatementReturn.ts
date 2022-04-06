import { AstStatementReturn } from '../../../data/ast/AstStatementReturn.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';
import { parseExpression } from './parseExpression.ts';

export function parseStatementReturn(
  browser: Browser,
): AstStatementReturn | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== 'return') {
    return browser.impasseLeaf('Keyword', 'return');
  }
  browser.consume();
  // type
  const annotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (annotation instanceof TokenImpasse) {
    return browser.impasseNode(annotation);
  }
  // value
  const value = browser.recurse('Expression', parseExpression);
  if (value instanceof TokenImpasse) {
    return browser.impasseNode(value);
  }
  // done
  return {
    annotation: annotation,
    value: value,
  };
}
