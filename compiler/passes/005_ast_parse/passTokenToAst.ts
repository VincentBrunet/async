import { TokenModule } from "../../data/token/TokenModule.ts";
import { parseModule } from "./parse/parseModule.ts";
import { Browser } from "./util/Browser.ts";
import { TokenDebugger } from "./util/TokenDebugger.ts";
import { TokenImpasse } from "./util/TokenImpasse.ts";

export function passTokenToAst(token: TokenModule) {
  const tokens = token.tokens;

  const browser = new Browser(tokens);

  const ast = browser.recurse(parseModule, token);

  if (ast instanceof TokenImpasse) {
    const debug = new TokenDebugger(tokens);
    throw debug.error(ast);
  }

  return ast;
}
