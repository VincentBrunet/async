import {
  AstTypeObject,
  AstTypeObjectField,
} from "../../../data/ast/AstTypeObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hashObjectKey } from "../../../lib/hash/hashObjectKey.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";

const fieldOpen = new Set(["{"]);
const fieldClose = new Set(["}"]);
const fieldDelim = new Set([",", ";"]);

function parseTypeObjectField(
  browser: TokenBrowser,
): AstTypeObjectField | TokenImpasse {
  // field - mutable
  let mutable = false;
  const fieldMutable = browser.peek();
  if (fieldMutable.str === "const") {
    mutable = false;
    browser.consume();
  } else if (fieldMutable.str === "mutable") {
    mutable = true;
    browser.consume();
  }
  // field - name
  const fieldName = browser.peek();
  if (fieldName.kind !== TokenKind.Text) {
    return browser.impasse("TypeObject.Field.Name");
  }
  browser.consume();
  const name = fieldName.str;
  // field - type
  const fieldAnnotation = browser.recurse(parseAnnotationType);
  if (fieldAnnotation instanceof TokenImpasse) {
    return browser.impasse("TypeObject.Field.Annotation", [
      fieldAnnotation,
    ]);
  }
  if (fieldAnnotation.type === undefined) {
    return browser.impasse("TypeObject.Field.Type");
  }
  // field - hash
  const hash = hashObjectKey(name);
  // done
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    type: fieldAnnotation.type,
  };
}

export function parseTypeObject(
  browser: TokenBrowser,
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
    return browser.impasse("TypeObject.Fields", [fields]);
  }
  // done, ast
  return {
    fields: fields,
  };
}
