import { AstBinary, AstBinaryOperator } from "../../../data/ast/AstBinary.ts";
import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

const symbolMap = new Map<string, AstBinaryOperator>();
symbolMap.set("+", AstBinaryOperator.Addition);
symbolMap.set("-", AstBinaryOperator.Substraction);
symbolMap.set("*", AstBinaryOperator.Multiplication);
symbolMap.set("/", AstBinaryOperator.Division);
symbolMap.set("%", AstBinaryOperator.Modulo);

const priorityMap = new Map<AstBinaryOperator, number>();
priorityMap.set(AstBinaryOperator.Addition, 1);
priorityMap.set(AstBinaryOperator.Substraction, 1);
priorityMap.set(AstBinaryOperator.Multiplication, 2);
priorityMap.set(AstBinaryOperator.Division, 2);
priorityMap.set(AstBinaryOperator.Modulo, 2);

export function parseBinary(
  browser: TokenBrowser,
  left: AstExpression,
): AstBinary | TokenImpasse {
  // operator
  const operator = symbolMap.get(browser.peek().str);
  if (operator !== undefined) {
    browser.consume();
  } else {
    return browser.impasse("Binary.Operator");
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
