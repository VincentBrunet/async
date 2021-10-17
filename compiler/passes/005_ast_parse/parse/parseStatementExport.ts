import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementExport(
  browser: Browser,
): AstStatementExport | TokenImpasse {
  // keyword - export
  const keyword = browser.peek();
  if (keyword.str !== "export") {
    return browser.impasse("StatementExport.KeywordExport");
  }
  browser.consume();
  // name
  const tokenName = browser.peek();
  if (tokenName.kind !== TokenKind.Text) {
    return browser.impasse("StatementExport.Name");
  }
  browser.consume();
  // type annotation
  const annotation = browser.recurse(parseAnnotationType);
  if (annotation instanceof TokenImpasse) {
    return browser.impasse("StatementExport.Annotation", [annotation]);
  }
  // equal
  const tokenEqual = browser.peek();
  if (tokenEqual.str !== "=") {
    return browser.impasse("StatementExport.Equal");
  }
  browser.consume();
  // actual value
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("StatementExport.Statement", [expression]);
  }
  // done
  return {
    name: tokenName.str,
    annotation: annotation,
    expression: expression,
  };
}
