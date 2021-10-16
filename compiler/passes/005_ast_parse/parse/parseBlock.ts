import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseBlock(browser: Browser): AstBlock | TokenImpasse {
  // bracket - open
  const bracketOpen = browser.peek();
  if (bracketOpen.str !== "{") {
    return browser.impasse("Block.Open");
  }
  browser.consume();
  // statements
  const statements = new Array<AstStatement>();
  while (true) {
    // bracket - close
    const bracketClose = browser.peek();
    if (bracketClose.str === "}") {
      browser.consume();
      break;
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
