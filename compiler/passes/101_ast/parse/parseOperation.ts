import { Operator } from "../../../constants/Operator.ts";
import { AstOperation } from "../data/AstOperation.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseOperation(
  browser: TokenBrowser,
): AstOperation | TokenImpasse {
  // left (required)
  const astExpressionLeft = browser.recurse(parseExpression);
  if (astExpressionLeft instanceof TokenImpasse) {
    return browser.impasse("Operation.Left", [astExpressionLeft]);
  }
  // operator (required)
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
    return browser.impasse("Operation.Operator");
  }
  // right
  const astExpressionRight = browser.recurse(parseExpression);
  if (astExpressionRight instanceof TokenImpasse) {
    return browser.impasse("Operation.Right", [astExpressionRight]);
  }
  return {
    operator: operator.str,
    left: astExpressionLeft,
    right: astExpressionRight,
  };
}
