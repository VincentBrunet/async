import { AstStatementCondition } from "../../../data/ast/AstStatementCondition.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementCondition(
  browser: TokenBrowser,
): AstStatementCondition | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "if") {
    return browser.impasse("Condition.Keyword");
  }
  browser.consume();
  // expression
  const astCondition = browser.recurse(parseExpression);
  if (astCondition instanceof TokenImpasse) {
    return browser.impasse("Condition.Condition", [astCondition]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Condition.Block", [astBlock]);
  }
  // done
  return {
    branches: [{
      condition: astCondition,
      block: astBlock,
    }],
  };
}
