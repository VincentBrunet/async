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
    return browser.impasse('TypeObject.Field.Name');
  }
  browser.consume();
  const name = fieldName.str;
  // field - type
  const fieldAnnotation = browser.recurse(parseAnnotationType);
  if (fieldAnnotation instanceof TokenImpasse) {
    return browser.impasse('TypeObject.Field.Annotation', [
      fieldAnnotation,
    ]);
  }
  if (fieldAnnotation.type === undefined) {
    return browser.impasse('TypeObject.Field.Type');
  }
  // field - hash
  const hash = hashObjectFieldName(name);
  // done
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    type: fieldAnnotation.type,
  };
}

export function parseTypeObject(
  browser: Browser,
): AstTypeObject | TokenImpasse {
  // items
  const fields = browser.recurseArray(
    true,
    fieldOpen,
    fieldClose,
    fieldDelim,
    parseTypeObjectField,
  );
  if (fields instanceof TokenImpasse) {
    return browser.impasse('TypeObject.Fields', [fields]);
  }
  // done, ast
  return {
    fields: fields,
  };
}
