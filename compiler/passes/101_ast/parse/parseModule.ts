import { AstModule } from "../data/AstModule.ts";
import { AstStatement } from "../data/AstStatement.ts";
import { TokenStack } from "../util/TokenStack.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseModule(stack: TokenStack): AstModule {
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
