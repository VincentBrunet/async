import { Keyword } from "../../../constants/Keyword.ts";
import { AstWhile } from "../../../data/ast/AstWhile.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseWhile(browser: TokenBrowser): AstWhile | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.While) {
    return browser.impasse("While.Keyword");
  }
  browser.consume();
  // expression
  const astExpression = browser.recurse(parseExpression);
  if (astExpression instanceof TokenImpasse) {
    return browser.impasse("While.Expression", [astExpression]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("While.Block", [astBlock]);
  }
  // done
  return {
    expression: astExpression,
    block: astBlock,
  };
}
