import { AstStatementWhile } from "../../../data/ast/AstStatementWhile.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementWhile(
  browser: Browser,
): AstStatementWhile | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "while") {
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
