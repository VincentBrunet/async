import { AstBlock } from "../data/AstBlock.ts";
import { AstStatement } from "../data/AstStatement.ts";
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
  const statements: AstStatement[] = [];
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
      return browser.impasse("Statement", astStatement);
    }
    statements.push(astStatement);
  }
  // done
  return {
    statements: statements,
  };
}
