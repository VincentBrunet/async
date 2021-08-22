import { AstStatement } from "../data/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseVariable } from "./parseVariable.ts";

export function parseStatement(stack: TokenBrowser): AstStatement | undefined {
  // const hello = expresion
  const astVariable = stack.parse(parseVariable);
  if (astVariable !== undefined) {
    return {
      variable: astVariable,
    };
  }
  // expression
  const astExpression = stack.parse(parseExpression);
  if (astExpression !== undefined) {
    return {
      expression: astExpression,
    };
  }
  // unknown
  return undefined;
}
