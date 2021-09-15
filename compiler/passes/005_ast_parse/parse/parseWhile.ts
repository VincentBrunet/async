import { Keyword } from "../../../constants/Keyword.ts";
import { AstWhile } from "../../../data/ast/AstWhile.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./expression/parseExpression.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseWhile(browser: TokenBrowser): AstWhile | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.While) {
    return browser.impasse("While.Keyword");
  }
  browser.consume();
  // expression
  const astCondition = browser.recurse(parseExpression);
  if (astCondition instanceof TokenImpasse) {
    return browser.impasse("While.Condition", [astCondition]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("While.Block", [astBlock]);
  }
  // done
  return {
    condition: astCondition,
    block: astBlock,
  };
}
