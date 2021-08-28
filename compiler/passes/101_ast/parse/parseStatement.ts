import { AstStatement } from "../data/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseVariable } from "./parseVariable.ts";

export function parseStatement(
  browser: TokenBrowser,
): AstStatement | TokenImpasse {
  // const hello = expresion
  const astVariable = browser.recurse(parseVariable);
  if (!(astVariable instanceof TokenImpasse)) {
    return {
      variable: astVariable,
    };
  }
  // expression
  const astExpression = browser.recurse(parseExpression);
  if (!(astExpression instanceof TokenImpasse)) {
    return {
      expression: astExpression,
    };
  }
  // unknown
  return browser.impasse("Statement", [astVariable, astExpression]);
}
