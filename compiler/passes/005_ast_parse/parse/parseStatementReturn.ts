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
  // expression
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("Return.Expression", [expression]);
  }
  // done
  return {
    annotation: annotation,
    expression: expression,
  };
}
