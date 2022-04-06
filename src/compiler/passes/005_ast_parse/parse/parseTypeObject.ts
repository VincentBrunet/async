import { AstTypeObject, AstTypeObjectField } from '../../../data/ast/AstTypeObject.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { hashObjectFieldName } from '../util/hashObjectFieldName.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';

const fieldOpen = new Set(['{']);
const fieldClose = new Set(['}']);
const fieldDelim = new Set([';']);

function parseTypeObjectField(
  browser: Browser,
): AstTypeObjectField | TokenImpasse {
  // field - mutable
  let mutable = false;
  const fieldMutable = browser.peek();
  if (fieldMutable.str === 'const') {
    mutable = false;
    browser.consume();
  } else if (fieldMutable.str === 'mutable') {
    mutable = true;
    browser.consume();
  }
  // field - name
  const fieldName = browser.peek();
  if (!tokenIsText(fieldName)) {
    return browser.impasseLeaf('Name', 'field name');
  }
  browser.consume();
  const name = fieldName.str;
  // field - type
  const fieldAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (fieldAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(fieldAnnotation);
  }
  // field - hash
  const hash = hashObjectFieldName(name);
  // done
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    annotation: fieldAnnotation,
  };
}

export function parseTypeObject(
  browser: Browser,
): AstTypeObject | TokenImpasse {
  // items
  const fields = browser.recurseArray(
    'Field',
    true,
    fieldOpen,
    fieldClose,
    fieldDelim,
    parseTypeObjectField,
  );
  if (fields instanceof TokenImpasse) {
    return browser.impasseNode(fields);
  }
  // done, ast
  return {
    fields: fields,
  };
}
