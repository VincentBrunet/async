import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { TokenModule } from "../../../data/token/TokenModule.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseModule(
  browser: TokenBrowser,
  meta: TokenModule,
): AstModule | TokenImpasse {
  // statements
  const statements = new Array<AstStatement>();
  while (true) {
    // done when empty
    if (browser.ended()) {
      break;
    }
    // parse statement
    const astStatement = browser.recurse(parseStatement);
    if (astStatement instanceof TokenImpasse) {
      return browser.impasse("Module", [astStatement]);
    }
    statements.push(astStatement);
  }
  // done
  return {
    meta: meta,
    statements: statements,
  };
}
