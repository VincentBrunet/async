import { Keyword } from "../../../constants/Keyword.ts";
import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { AstDo } from "../../../data/ast/AstDo.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseDo(browser: TokenBrowser): AstDo | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Do) {
    return browser.impasse("Do.Keyword");
  }
  browser.consume();

  // TODO - type (optional)

  // block (optional)
  let block: AstBlock | undefined;
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Do.Block", [astBlock]);
  }
  block = astBlock;

  return {
    type: {}, // TODO
    block: block,
  };
}
