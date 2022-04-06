import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';
import { parseExpression } from './parseExpression.ts';

export function parseStatementVariable(
  browser: Browser,
): AstStatementVariable | TokenImpasse {
  // keyword const/mutable
  let mutable = false;
  const modifier = browser.peek();
  if (modifier.str === 'const') {
    mutable = false;
  } else if (modifier.str === 'mutable') {
    mutable = true;
  } else {
    return browser.impasseLeaf('Modifier', ['const', 'mutable']);
  }
  browser.consume();
  // name
  const tokenName = browser.peek();
  if (!tokenIsText(tokenName)) {
    return browser.impasseLeaf('Name', 'a variable name');
  }
  browser.consume();
  // type annotation
  const astAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(astAnnotation);
  }
  // value (optional)
  let value: AstExpression | undefined;
  const tokenEqual = browser.peek();
  if (tokenEqual.str === '=') {
    browser.consume();
    const astValue = browser.recurse('Expression', parseExpression);
    if (astValue instanceof TokenImpasse) {
      return browser.impasseNode(astValue);
    }
    value = astValue;
  }
  // prep
  const name = tokenName.str;
  // Done
  return {
    mutable: mutable,
    name: name,
    annotation: astAnnotation,
    value: value,
  };
}
