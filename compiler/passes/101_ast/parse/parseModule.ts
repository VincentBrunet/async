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
      return browser.impasse("Invalid statement", astStatement);
    } else {
      statements.push(astStatement);
    }
  }
  return {
    statements: statements,
  };
}
