import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementExpression(
  browser: Browser,
): AstStatementExpression | TokenImpasse {
  // expression
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("Statement.Expression", [expression]);
  }
  // done
  return {
    expression: expression,
  };
}
