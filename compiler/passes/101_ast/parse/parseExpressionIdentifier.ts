import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

export function parseExpressionIdentifier(
  stack: TokenBrowser
): AstExpression | undefined {
  // identifier
  const identifier = stack.parse(parseIdentifier);
  if (identifier !== undefined) {
    return {
      type: AstExpressionType.Identifier,
      value: {
        name: identifier,
      },
    };
  }
  // unknown
  return undefined;
}
