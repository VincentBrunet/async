import { Keyword } from "../../../constants/Keyword.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { AstType } from "../../../data/ast/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseObject(browser: TokenBrowser): AstType | TokenImpasse {
  const astObject: AstObject = {};

  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Object) {
    return browser.impasse("Object.Keyboard");
  }
  browser.consume();

  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Object.Block", [astBlock]);
  }
  astObject.block = astBlock;

  return astObject;
}
