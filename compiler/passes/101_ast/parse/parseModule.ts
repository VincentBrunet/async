import { AstModule } from "../data/AstModule.ts";
import { AstStatement } from "../data/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseModule(stack: TokenBrowser): AstModule {
  const statements: AstStatement[] = [];
  while (true) {
    if (stack.ended()) {
      break;
    }
    const astStatement = stack.parse(parseStatement);
    if (astStatement === undefined) {
      stack.error("Invalid statement");
    } else {
      statements.push(astStatement);
    }
  }
  return {
    statements: statements,
  };
}
