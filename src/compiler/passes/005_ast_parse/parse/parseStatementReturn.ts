import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementReturn(
  browser: Browser,
): AstStatementReturn | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== "return") {
    return browser.impasse("Return.Keyword");
  }
  browser.consume();
  // type
  const annotation = browser.recurse(parseAnnotationType);
  if (annotation instanceof TokenImpasse) {
    return browser.impasse("Return.Annotation", [annotation]);
  }
  // value
  const value = browser.recurse(parseExpression);
  if (value instanceof TokenImpasse) {
    return browser.impasse("Return.Expression", [value]);
  }
  // done
  return {
    annotation: annotation,
    value: value,
  };
}
