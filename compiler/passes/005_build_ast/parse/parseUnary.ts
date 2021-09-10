import { Keyword } from "../../../constants/Keyword.ts";
import { AstUnary } from "../../../data/ast/AstUnary.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseUnary(
  browser: TokenBrowser,
): AstUnary | TokenImpasse {
  // operator
  const operator = browser.peek();
  if (
    operator.str === Operator.MathAddition ||
    operator.str === Operator.MathSubstraction ||
    operator.str === Operator.MathMultiplication ||
    operator.str === Operator.MathDivision || // TODO - priority must differ
    operator.str === Operator.MathModulo
  ) {
    browser.consume();
  } else {
    return browser.impasse("Unary.Operator");
  }
  // Expression
  const astExpression = browser.recurse(parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("Unary.Left", [astExpression]);
  }
  // right
  const astExpressionRight = browser.recurse(parseExpression);
  if (astExpressionRight instanceof TokenImpasse) {
    return browser.impasse("Unary.Right", [astExpressionRight]);
  }
  // done
  return {
    operator: operator.str,
    expression: astExpression,
  };
}
