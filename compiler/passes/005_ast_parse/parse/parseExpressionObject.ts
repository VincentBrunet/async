import {
  AstExpressionObject,
  AstExpressionObjectField,
} from "../../../data/ast/AstExpressionObject.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hashObjectKey } from "../../../lib/hash/hashObjectKey.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

const objectOpen = new Set(["{"]);
const objectClose = new Set(["}"]);
const objectDelim = new Set([",", ";"]);

function parseExpressionObjectField(
  browser: TokenBrowser,
): AstExpressionObjectField | TokenImpasse {
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
  const hash = hashObjectKey(name);
  // field - validated
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    expression: fieldExpression,
  };
}

export function parseExpressionObject(
  browser: TokenBrowser,
): AstExpressionObject | TokenImpasse {
  // fields
  const fields = browser.recurseArray(
    true,
    objectOpen,
    objectClose,
    objectDelim,
    parseExpressionObjectField,
  );
  if (fields instanceof TokenImpasse) {
    return browser.impasse("ExpressionObject.Fields", [fields]);
  }
  // done, ast
  return {
    fields: fields,
  };
}
