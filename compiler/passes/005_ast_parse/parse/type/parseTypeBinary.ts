import { AstType } from "../../../../data/ast/type/AstType.ts";
import {
  AstTypeBinary,
  AstTypeBinaryOperator,
} from "../../../../data/ast/type/AstTypeBinary.ts";
import { TokenBrowser } from "../../util/TokenBrowser.ts";
import { TokenImpasse } from "../../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

/**
 * Support operator symbols
 */
const symbolMap = new Map<string, AstTypeBinaryOperator>();

symbolMap.set("&", AstTypeBinaryOperator.And);
symbolMap.set("|", AstTypeBinaryOperator.Or);

/**
 * Do the parsing using an already-parsed left handside
 */
export function parseTypeBinary(
  browser: TokenBrowser,
  left: AstType,
): AstTypeBinary | TokenImpasse {
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
    return browser.impasse("TypeBinary.Operator");
  }
  for (let i = 0; i < consumed; i++) {
    browser.consume();
  }
  // right
  const right = browser.recurse(parseType);
  if (right instanceof TokenImpasse) {
    return browser.impasse("TypeBinary.Right", [right]);
  }
  // done
  return {
    operator: operator,
    type1: left,
    type2: right,
  };
}
