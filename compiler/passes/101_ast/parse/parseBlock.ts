import { AstBlock } from "../data/AstBlock.ts";
import { AstStatement } from "../data/AstStatement.ts";
import { TokenStack } from "../util/TokenStack.ts";
import { parseStatement } from "./parseStatement.ts";

export function parseBlock(stack: TokenStack): AstBlock | undefined {
  // open
  const open = stack.peek();
  if (open.str !== "{") {
    return undefined;
  }
  stack.consume();

  // statements
  const statements: AstStatement[] = [];
  while (true) {
    // close
    const close = stack.peek();
    if (close.str === "}") {
      stack.consume();
      break;
    }
    // statement
    const astStatement = stack.parse(parseStatement);
    if (astStatement === undefined) {
      stack.error("Expecting a statement");
    } else {
      statements.push(astStatement);
    }
  }

  // done
  return {
    statements: statements,
  };
}
