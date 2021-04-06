import { Token } from "../001_tokens/data/Token.ts";
import { AstModule } from "./data/AstModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenStack } from "./util/TokenStack.ts";

export function convertTokensToAst(tokens: Token[]): AstModule {
  const stack = new TokenStack(tokens);
  return parseModule(stack);
}
