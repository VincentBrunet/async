import { AstExpression,AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseFunction } from "./parseFunction.ts";

export function parseExpressionFunction(
  stack: TokenBrowser,
): AstExpression | undefined {
  // function declaration
  const astFunction = stack.parse(parseFunction);
  if (astFunction !== undefined) {
    return {
      type: AstExpressionType.Function,
      value: {
        function: astFunction,
      },
    };
  }
  // next
  return stack.parse(parseExpressionMath);
}
