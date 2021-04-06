import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { TokenStack } from "../util/TokenStack.ts";

export function parseIdentifier(stack: TokenStack): string | undefined {
  const token = stack.peek();
  if (token.type === TokenType.Identifier) {
    stack.consume();
    return token.str;
  }
  return undefined;
}
