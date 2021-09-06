import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatement } from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseModule(browser: TokenBrowser): AstModule | TokenImpasse {
  const statements = new Array<AstStatement>();
  while (true) {
    if (browser.ended()) {
      break;
    }
    const astStatement = browser.recurse(parseStatement);
    if (astStatement instanceof TokenImpasse) {
      console.log("statements", JSON.stringify(statements, null, 4));
      return browser.impasse("Module", [astStatement]);
    } else {
      statements.push(astStatement);
    }
  }
  return {
    statements: statements,
  };
}
