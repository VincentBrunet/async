import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseBlock(
  browser: Browser,
  bracketsOptional?: boolean,
): AstBlock | TokenImpasse {
  // bracket - open
  if (!bracketsOptional) {
    const bracketOpen = browser.peek();
    if (bracketOpen.str !== "{") {
      return browser.impasse("Block.Open");
    }
    browser.consume();
  }
  // statements
  const statements = new Array<AstStatement>();
  while (true) {
    if (!bracketsOptional) {
      // bracket - close
      const bracketClose = browser.peek();
      if (bracketClose.str === "}") {
        browser.consume();
        break;
      }
    } else {
      // done when empty
      if (browser.ended()) {
        break;
      }
    }
    // parse statement
    const astStatement = browser.recurse(parseStatement);
    if (astStatement instanceof TokenImpasse) {
      console.log("Block.Previous", JSON.stringify(statements, null, 4));
      return browser.impasse("Block.Statement", [astStatement]);
    }
    statements.push(astStatement);
  }
  // done
  return {
    statements: statements,
  };
}
