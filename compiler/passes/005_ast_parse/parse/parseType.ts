import { AstType, AstTypeKind } from "../../../data/ast/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseType(browser: TokenBrowser): AstType | TokenImpasse {
  const keyword = browser.peek();
  if (keyword.str !== ":") {
    return {
      kind: AstTypeKind.Infered,
      data: {},
    };
  }

  // TODO
  return browser.impasse("Type not implemented yet");
}
