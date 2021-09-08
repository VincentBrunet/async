import { Keyword } from "../../../constants/Keyword.ts";
import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseObject(browser: TokenBrowser): AstObject | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Object) {
    return browser.impasse("Object.Keyboard");
  }
  browser.consume();

  // TODO - type (optional)

  // block (optional)
  let block: AstBlock | undefined;
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Object.Block", [astBlock]);
  }
  block = astBlock;

  return {
    type: {}, // TODO
    block: block,
  };
}
