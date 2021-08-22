import { Operator } from "../../../constants/Operator.ts";
import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseExpressionCall } from "./parseExpressionCall.ts";

export function parseExpressionMath(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  // left (required)
  const astExpressionLeft = browser.recurse(parseExpressionCall);
  if (astExpressionLeft instanceof TokenImpasse) {
    return browser.impasse("Not an expression", [astExpressionLeft]);
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
    return astExpressionLeft;
  }
  // right
  const astExpressionRight = browser.recurse(parseExpression);
  if (astExpressionRight instanceof TokenImpasse) {
    return browser.impasse("Expression (right side)", [astExpressionRight]);
  }
  return {
    type: AstExpressionType.Math,
    value: {
      operator: operator.str,
      left: astExpressionLeft,
      right: astExpressionRight,
    },
  };
}
