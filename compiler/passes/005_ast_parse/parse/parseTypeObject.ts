import {
  AstTypeObject,
  AstTypeObjectField,
} from "../../../data/ast/AstTypeObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hash64 } from "../../../lib/core/strings/hash64.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";

export function parseTypeObject(
  browser: TokenBrowser,
): AstTypeObject | TokenImpasse {
  // field - open
  const fieldOpen = browser.peek();
  if (fieldOpen.str !== "{") {
    return browser.impasse("TypeObject.Open");
  }
  browser.consume();

  // field - loop
  const astFields = new Array<AstTypeObjectField>();
  while (true) {
    // field - close
    const fieldClose = browser.peek();
    if (fieldClose.str === "}") {
      browser.consume();
      break;
    }

    // field - start
    const fieldBegin = browser.index();

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
    const hash = hash64(name);

    // field - end
    const fieldEnd = browser.index();

    // field - validated
    astFields.push({
      mutable: mutable,
      name: name,
      hash: hash,
      type: fieldAnnotation.type,
      token: {
        begin: fieldBegin,
        end: fieldEnd,
      },
    });

    // field - separator, end
    const fieldDelim = browser.peek();
    if (fieldDelim.str === ",") {
      browser.consume();
    } else if (fieldDelim.str === ";") {
      browser.consume();
    } else if (fieldDelim.str === "}") {
      browser.consume();
      break;
    } else {
      return browser.impasse("TypeObject.Field.Separator");
    }
  }

  // done, ast
  return {
    fields: astFields,
  };
}
