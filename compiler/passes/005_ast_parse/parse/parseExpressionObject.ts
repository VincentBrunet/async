import {
  AstExpressionObject,
  AstExpressionObjectField,
} from "../../../data/ast/AstExpressionObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hash64 } from "../../../lib/core/strings/hash64.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionObject(
  browser: TokenBrowser,
): AstExpressionObject | TokenImpasse {
  // field - open
  const fieldOpen = browser.peek();
  if (fieldOpen.str !== "{") {
    return browser.impasse("ExpressionObject.Open");
  }
  browser.consume();

  // field - loop
  const astFields = new Array<AstExpressionObjectField>();
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
      return browser.impasse("ExpressionObject.Field.Name");
    }
    browser.consume();
    const name = fieldName.str;

    // field - equal
    const fieldEqual = browser.peek();
    if (fieldEqual.str !== "=") {
      return browser.impasse("ExpressionObject.Field.Equal");
    }
    browser.consume();

    // field - expression
    const fieldExpression = browser.recurse(parseExpression);
    if (fieldExpression instanceof TokenImpasse) {
      return browser.impasse("ExpressionObject.Field.Expression", [
        fieldExpression,
      ]);
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
      expression: fieldExpression,
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
      return browser.impasse("ExpressionObject.Field.Separator");
    }
  }

  // done, ast
  return {
    fields: astFields,
  };
}
