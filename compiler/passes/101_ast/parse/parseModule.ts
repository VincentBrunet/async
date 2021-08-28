import { AstModule } from "../data/AstModule.ts";
import { AstStatement } from "../data/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseModule(browser: TokenBrowser): AstModule | TokenImpasse {
  const statements: AstStatement[] = [];
  while (true) {
    if (browser.ended()) {
      break;
    }
    const astStatement = browser.recurse(parseStatement);
    if (astStatement instanceof TokenImpasse) {
      console.log("statements", JSON.stringify(statements, null, 4))
      return browser.impasse("Module", [astStatement]);
    } else {
      statements.push(astStatement);
    }
  }
  return {
    statements: statements,
  };
}
