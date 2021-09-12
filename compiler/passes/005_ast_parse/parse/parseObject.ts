import { Keyword } from "../../../constants/Keyword.ts";
import { AstObject } from "../../../data/ast/AstObject.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseType } from "./parseType.ts";

export function parseObject(browser: TokenBrowser): AstObject | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Object) {
    return browser.impasse("Object.Keyword");
  }
  browser.consume();
  // type
  const astType = browser.recurse(parseType);
  if (astType instanceof TokenImpasse) {
    return browser.impasse("Object.Type", [astType]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Object.Block", [astBlock]);
  }
  // done
  return {
    type: astType,
    block: astBlock,
  };
}
