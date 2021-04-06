import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenStack } from "../util/TokenStack.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

function parseExpressionIdentifier(
  stack: TokenStack
): AstExpression | undefined {
  // identifier
  const identifier = stack.parse(parseIdentifier);
  if (identifier !== undefined) {
    return {
      type: AstExpressionType.Identifier,
      value: {
        name: identifier,
      },
    };
  }
  // litteral
  // unknown
  return undefined;
}

function parseExpressionCall(stack: TokenStack): AstExpression | undefined {
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

export function parseExpression(stack: TokenStack): AstExpression | undefined {
  // function declaration
  const astFunction = stack.parse(parseFunction);
  if (astFunction !== undefined) {
    return {
      type: AstExpressionType.Function,
      value: {
        function: astFunction,
      },
    };
  }
  // unknown
  return stack.parse(parseExpressionCall);
}
