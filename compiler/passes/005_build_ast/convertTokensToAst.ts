import { Token } from "../../data/token/Token.ts";
import { AstModule } from "../../data/ast/AstModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenBrowser } from "./util/TokenBrowser.ts";
import { TokenDebugger } from "./util/TokenDebugger.ts";
import { TokenImpasse } from "./util/TokenImpasse.ts";

export function convertTokensToAst(tokens: Array<Token>): AstModule {
  const browser = new TokenBrowser(tokens);

  const astModule = parseModule(browser);

  if (astModule instanceof TokenImpasse) {
    const debug = new TokenDebugger(tokens);
    throw debug.error(astModule);
  }

  return astModule;
}