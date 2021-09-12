import { Keyword } from "../../../constants/Keyword.ts";
import { AstRun } from "../../../data/ast/AstRun.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseType } from "./parseType.ts";

export function parseRun(browser: TokenBrowser): AstRun | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Run) {
    return browser.impasse("Run.Keyword");
  }
  browser.consume();
  // type
  const astType = browser.recurse(parseType);
  if (astType instanceof TokenImpasse) {
    return browser.impasse("Run.Type", [astType]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Run.Block", [astBlock]);
  }
  // done
  return {
    type: astType,
    block: astBlock,
  };
}
