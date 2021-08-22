import { Operator } from "../../../constants/Operator.ts";
import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpression } from "./parseExpression.ts";

function parseExpressionMath(stack: TokenBrowser): AstExpression | undefined {
  // left
  const astExpressionLeft = stack.parse(parseExpressionCall);
  if (astExpressionLeft === undefined) {
    return undefined;
  }
  // operator
  const operator = stack.peek();
  if (
    operator.str === Operator.MathAddition ||
    operator.str === Operator.MathSubstraction ||
    operator.str === Operator.MathMultiplication ||
    operator.str === Operator.MathDivision || // TODO - priority must differ
    operator.str === Operator.MathModulo
  ) {
    stack.consume();
  } else {
    return astExpressionLeft;
  }
  // right
  const astExpressionRight = stack.parse(parseExpression);
  if (astExpressionRight === undefined) {
    stack.error("Expected an expression");
  } else {
    return {
      type: AstExpressionType.Math,
      value: {
        operator: operator.str,
        left: astExpressionLeft,
        right: astExpressionRight,
      },
    };
  }
}
