import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseIdentifier } from "./parseIdentifier.ts";

const digits = new Set<string>();
digits.add("0");
digits.add("1");
digits.add("2");
digits.add("3");
digits.add("4");
digits.add("5");
digits.add("6");
digits.add("7");
digits.add("8");
digits.add("9");
digits.add("a");
digits.add("b");
digits.add("c");
digits.add("d");
digits.add("e");
digits.add("f");

function makeExpression(type: string, value: string) {
  return {
    type: AstExpressionType.Literal,
    data: {
      type: type,
      value: value,
    },
  };
}

export function parseExpressionLiteral(
  browser: TokenBrowser,
): AstExpression | TokenImpasse {
  const identifier = browser.recurse(parseIdentifier);
  if (identifier instanceof TokenImpasse) {
    return browser.impasse("Literal", [identifier]);
  }

  if (identifier == "true") {
    return makeExpression("bool", "true");
  }
  if (identifier == "false") {
    return makeExpression("bool", "false");
  }
  if (identifier == "null") {
    return makeExpression("null", "null");
  }

  let value = identifier;
  if (identifier.startsWith("0x")) {
    value = parseInt(identifier.slice(2), 16).toString(10);
  }
  if (identifier.startsWith("0b")) {
    value = parseInt(identifier.slice(2), 2).toString(10);
  }
  if (digits.has(identifier[0])) {
    return makeExpression("i32", value);
  }

  return browser.impasse("Literal");
}
