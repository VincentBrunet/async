import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationTemplate } from './parseAnnotationTemplate.ts';
import { parseType } from './parseType.ts';

export function parseStatementTypedef(
  browser: Browser,
): AstStatementTypedef | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== 'typedef') {
    return browser.impasseLeaf('Keyword', 'typedef');
  }
  browser.consume();
  // name
  const tokenName = browser.peek();
  if (!tokenIsText(tokenName)) {
    return browser.impasseLeaf('Name', 'a type name');
  }
  browser.consume();
  // template
  const astTemplate = browser.recurse('AnnotationTemplate', parseAnnotationTemplate);
  if (astTemplate instanceof TokenImpasse) {
    return browser.impasseNode(astTemplate);
  }
  // equal
  const tokenEqual = browser.peek();
  if (tokenEqual.str !== '=') {
    return browser.impasseLeaf('Equal', '=');
  }
  browser.consume();
  // type
  const astType = browser.recurse('Type', parseType);
  if (astType instanceof TokenImpasse) {
    return browser.impasseNode(astType);
  }
  // done
  return {
    name: tokenName.str,
    type: astType,
    template: astTemplate,
  };
}
