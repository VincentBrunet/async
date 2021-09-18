import {
  AstTypeObject,
  AstTypeObjectField,
} from "../../../data/ast/AstTypeObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";

export function parseTypeObject(
  browser: TokenBrowser,
): AstTypeObject | TokenImpasse {
  // field - open
  const fieldOpen = browser.peek();
  if (fieldOpen.str !== "{") {
    return browser.impasse("TypeObject.Field.Open");
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

    // field - name
    const fieldName = browser.peek();
    if (fieldName.kind !== TokenKind.Text) {
      return browser.impasse("TypeObject.Field.Name");
    }
    browser.consume();

    // field - type
    const fieldAnnotation = browser.recurse(parseAnnotation);
    if (fieldAnnotation instanceof TokenImpasse) {
      return browser.impasse("TypeObject.Field.Annotation", [
        fieldAnnotation,
      ]);
    }
    if (fieldAnnotation.type === undefined) {
      return browser.impasse("TypeObject.Field.Type");
    }

    // field - validated
    astFields.push({
      name: fieldName.str,
      type: fieldAnnotation.type,
    });

    // field - separator, end
    const fieldDelim = browser.peek();
    if (fieldDelim.str === ",") {
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
