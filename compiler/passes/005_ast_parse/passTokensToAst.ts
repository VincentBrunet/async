import { Token } from "../../data/token/Token.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenBrowser } from "./util/TokenBrowser.ts";
import { TokenDebugger } from "./util/TokenDebugger.ts";
import { TokenImpasse } from "./util/TokenImpasse.ts";

export async function passTokensToAst(tokens: Array<Token>) {
  const browser = new TokenBrowser(tokens);

  const ast = parseModule(browser);

  if (ast instanceof TokenImpasse) {
    const debug = new TokenDebugger(tokens);
    throw debug.error(ast);
  }

  return ast;
}
