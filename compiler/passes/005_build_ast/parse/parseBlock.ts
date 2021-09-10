import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseBlock(browser: TokenBrowser): AstBlock | TokenImpasse {
  // open bracket (required)
  const open = browser.peek();
  if (open.str !== "{") {
    return browser.impasse("Block");
  }
  browser.consume();
  // statements
  const statements = new Array<AstStatement>();
  while (true) {
    // close
    const close = browser.peek();
    if (close.str === "}") {
      browser.consume();
      break;
    }
    // statement
    const astStatement = browser.recurse(parseStatement);
    if (astStatement instanceof TokenImpasse) {
      console.log("Previous statements", JSON.stringify(statements, null, 4));
      return browser.impasse("Block.Statement", [astStatement]);
    }
    statements.push(astStatement);
  }
  // done
  return {
    statements: statements,
  };
}
