import { Token } from "../001_tokens/data/Token.ts";
import { AstModule } from "./data/AstModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenBrowser } from "./util/TokenBrowser.ts";

export function convertTokensToAst(tokens: Token[]): AstModule {
  const stack = new TokenBrowser(tokens);
  return parseModule(stack);
}
