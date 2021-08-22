import { Operator } from "../../../constants/Operator.ts";
import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpressionParenthesis } from "./parseExpressionParenthesis.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

export function parseExpression(
  stack: TokenBrowser
): AstExpression | undefined {
  return stack.parse(parseExpressionParenthesis);
}
