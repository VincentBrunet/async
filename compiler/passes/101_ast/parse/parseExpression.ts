import { Operator } from "../../../constants/Operator.ts";
import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseFunction } from "./parseFunction.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

function parseExpressionIdentifier(
  stack: TokenBrowser,
): AstExpression | undefined {
  // parenthesis
  const parenthesisOpen = stack.peek();
  if (parenthesisOpen.str === "(") {
    stack.consume();
    const astExpression = stack.parse(parseExpression);
    if (astExpression === undefined) {
      stack.error("Expecting an expression");
    }
    const parenthesisClose = stack.peek();
    if (parenthesisClose.str === ")") {
      stack.consume();
      return astExpression;
    } else {
      stack.error("Expecting a closing parenthesis");
    }
  }
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

function parseExpressionCall(stack: TokenBrowser): AstExpression | undefined {
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

function parseExpressionMath(stack: TokenBrowser): AstExpression | undefined {
  // left
  const astExpressionLeft = stack.parse(parseExpressionCall);
  if (astExpressionLeft === undefined) {
    return undefined;
  }
  // operator
  const operator = stack.peek();
  if (
    operator.str === Operator.MathAddition ||
    operator.str === Operator.MathSubstraction ||
    operator.str === Operator.MathMultiplication ||
    operator.str === Operator.MathDivision || // TODO - priority must differ
    operator.str === Operator.MathModulo
  ) {
    stack.consume();
  } else {
    return astExpressionLeft;
  }
  // right
  const astExpressionRight = stack.parse(parseExpression);
  if (astExpressionRight === undefined) {
    stack.error("Expected an expression");
  } else {
    return {
      type: AstExpressionType.Math,
      value: {
        operator: operator.str,
        left: astExpressionLeft,
        right: astExpressionRight,
      },
    };
  }
}

function parseExpressionFunction(
  stack: TokenBrowser,
): AstExpression | undefined {
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
  // next
  return stack.parse(parseExpressionMath);
}

export function parseExpression(
  stack: TokenBrowser,
): AstExpression | undefined {
  // root
  return stack.parse(parseExpressionFunction);
}
