import { AstExpressionObject, AstExpressionObjectField } from '../../../data/ast/AstExpressionObject.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { hashObjectFieldName } from '../util/hashObjectFieldName.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';
import { parseExpression } from './parseExpression.ts';

const objectOpen = new Set(['{']);
const objectClose = new Set(['}']);
const objectDelim = new Set([';']);

function parseExpressionObjectField(
  browser: Browser,
): AstExpressionObjectField | TokenImpasse {
  // field - mutable
  let mutable = false;
  const keyword = browser.peek();
  if (keyword.str === 'const') {
    mutable = false;
    browser.consume();
  } else if (keyword.str === 'mutable') {
    mutable = true;
    browser.consume();
  }
  // field - name
  const name = browser.peek();
  if (!tokenIsText(name)) {
    return browser.impasse('ExpressionObject.Field.Name');
  }
  browser.consume();
  // field - annotation
  const annotation = browser.recurse(parseAnnotationType);
  if (annotation instanceof TokenImpasse) {
    return browser.impasse('ExpressionObject.Field.Annotation', [annotation]);
  }
  // field - equal
  const equal = browser.peek();
  if (equal.str !== '=') {
    return browser.impasse('ExpressionObject.Field.Equal');
  }
  browser.consume();
  // field - expression
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse('ExpressionObject.Field.Expression', [expression]);
  }
  // field - hash
  const hash = hashObjectFieldName(name.str);
  // field - validated
  return {
    mutable: mutable,
    name: name.str,
    hash: hash,
    annotation: annotation,
    expression: expression,
  };
}

export function parseExpressionObject(
  browser: Browser,
): AstExpressionObject | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== 'obj') {
    return browser.impasse('ExpressionObject.Keyword');
  }
  browser.consume();
  // annotation
  const annotation = browser.recurse(parseAnnotationType);
  if (annotation instanceof TokenImpasse) {
    return browser.impasse('ExpressionObject.Annotation', [annotation]);
  }
  // fields
  const fields = browser.recurseArray(
    true,
    objectOpen,
    objectClose,
    objectDelim,
    parseExpressionObjectField,
  );
  if (fields instanceof TokenImpasse) {
    return browser.impasse('ExpressionObject.Fields', [fields]);
  }
  // done, ast
  return {
    annotation: annotation,
    fields: fields,
  };
}
