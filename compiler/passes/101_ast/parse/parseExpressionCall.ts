import { AstExpression,AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionCall(stack: TokenBrowser): AstExpression | undefined {
  // callee
  const astCallee = stack.parse(parseExpressionIdentifier);
  if (astCallee === undefined) {
    return undefined;
  }
  // param - open
  const delimParamOpen = stack.peek();
  if (delimParamOpen.str !== "(") {
    return astCallee;
  }
  stack.consume();
  // param - loop
  const astParams = [];
  while (true) {
    // param - close
    const delimParamClose = stack.peek();
    if (delimParamClose.str === ")") {
      stack.consume();
      break;
    }
    // param - content
    const astParam = stack.parse(parseExpression);
    if (astParam === undefined) {
      stack.error("Expected an expression");
    } else {
      astParams.push(astParam);
    }
  }
  // done
  return {
    type: AstExpressionType.Call,
    value: {
      callee: astCallee,
      params: astParams,
    },
  };
}
