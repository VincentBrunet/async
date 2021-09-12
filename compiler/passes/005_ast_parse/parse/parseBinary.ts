import { AstBinary, AstBinaryOperator } from "../../../data/ast/AstBinary.ts";
import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

/**
 * Support operator symbols
 */
const symbolMap = new Map<string, AstBinaryOperator>();

symbolMap.set("*", AstBinaryOperator.Multiplication);
symbolMap.set("/", AstBinaryOperator.Division);
symbolMap.set("%", AstBinaryOperator.Modulo);

symbolMap.set("+", AstBinaryOperator.Addition);
symbolMap.set("-", AstBinaryOperator.Substraction);

symbolMap.set("==", AstBinaryOperator.Equal);
symbolMap.set("!=", AstBinaryOperator.NotEqual);

symbolMap.set("<", AstBinaryOperator.Less);
symbolMap.set("<=", AstBinaryOperator.LessOrEqual);
symbolMap.set(">", AstBinaryOperator.More);
symbolMap.set(">=", AstBinaryOperator.MoreOrEqual);

symbolMap.set("&&", AstBinaryOperator.And);
symbolMap.set("||", AstBinaryOperator.Or);

symbolMap.set("=", AstBinaryOperator.Assign);

/**
 * Do the parsing using an already-parsed left handside
 */
export function parseBinary(
  browser: TokenBrowser,
  left: AstExpression,
): AstBinary | TokenImpasse {
  // operator
  const operator1 = browser.peek(0).str;
  const operator2 = browser.peek(1).str;
  let operator = symbolMap.get(operator1 + operator2);
  let consumed = 2;
  if (operator === undefined) {
    operator = symbolMap.get(operator1);
    consumed = 1;
  }
  if (operator === undefined) {
    return browser.impasse("Binary.Operator");
  }
  for (let i = 0; i < consumed; i++) {
    browser.consume();
  }
  // right
  const right = browser.recurse(parseExpression);
  if (right instanceof TokenImpasse) {
    return browser.impasse("Binary.Right", [right]);
  }
  // done
  return {
    operator: operator,
    expression1: left,
    expression2: right,
  };
}
