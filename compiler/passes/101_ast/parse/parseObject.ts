import { Keyword } from "../../../constants/Keyword.ts";
import { AstObject } from "../data/AstObject.ts";
import { AstType } from "../data/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseObject(browser: TokenBrowser): AstType | TokenImpasse {
  const astObject: AstObject = {};

  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Object) {
    return browser.impasse("Cannot be an object declaration");
  }
  browser.consume();

  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  astObject.block = astBlock;

  return astObject;
}
