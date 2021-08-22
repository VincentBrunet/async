import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";

export function parseIdentifier(stack: TokenBrowser): string | undefined {
  const token = stack.peek();
  if (token.type === TokenType.Identifier) {
    stack.consume();
    return token.str;
  }
  return undefined;
}
