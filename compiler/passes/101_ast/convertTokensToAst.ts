import { Token } from "../001_tokens/data/Token.ts";
import { AstModule } from "./data/AstModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenBrowser } from "./util/TokenBrowser.ts";
import { TokenImpasse } from "./util/TokenImpasse.ts";

export function convertTokensToAst(tokens: Token[]): AstModule {
  const browser = new TokenBrowser(tokens);
  const astModule = parseModule(browser);
  if (astModule instanceof TokenImpasse) {
    throw new Error(astModule.toString());
  }
  return astModule;
}
