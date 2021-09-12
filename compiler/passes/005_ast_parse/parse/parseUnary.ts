import { AstUnary, AstUnaryOperator } from "../../../data/ast/AstUnary.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

const symbolMap = new Map<string, AstUnaryOperator>();
symbolMap.set("+", AstUnaryOperator.Positive);
symbolMap.set("-", AstUnaryOperator.Negative);

export function parseUnary(
  browser: TokenBrowser,
): AstUnary | TokenImpasse {
  // operator
  const operator = symbolMap.get(browser.peek().str);
  if (operator !== undefined) {
    browser.consume();
  } else {
    return browser.impasse("Unary.Operator");
  }
  // Expression
  const expression = browser.recurse(parseExpression);
  if (expression instanceof TokenImpasse) {
    return browser.impasse("Unary.Expression", [expression]);
  }
  // done
  return {
    operator: operator,
    expression: expression,
  };
}
