import { TokenModule } from "../../data/token/TokenModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { TokenBrowser } from "./util/TokenBrowser.ts";
import { TokenDebugger } from "./util/TokenDebugger.ts";
import { TokenImpasse } from "./util/TokenImpasse.ts";

export async function passTokensToAst(module: TokenModule) {
  const tokens = module.list;

  const browser = new TokenBrowser(tokens);

  const ast = parseModule(browser, module);

  if (ast instanceof TokenImpasse) {
    const debug = new TokenDebugger(tokens);
    throw debug.error(ast);
  }

  return ast;
}
