import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

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

function makeLiteral(
  browser: Browser,
  native: AstTypePrimitiveNative,
  value: string,
): AstExpressionLiteral {
  browser.forward();
  return {
    native: native,
    value: value,
  };
}

function makeStringUntil(
  browser: Browser,
  delimiter: string,
): AstExpressionLiteral {
  const parts = [];
  let escaped = false;
  while (true) {
    if (browser.ended()) {
      throw new Error("Unclosed string literal");
    }
    const str = browser.peek().str;
    browser.increment();
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (escaped) {
        switch (char) {
          case "n":
            parts.push("\n");
            break;
          case "r":
            parts.push("\r");
            break;
          case "t":
            parts.push("\t");
            break;
          case "a":
            parts.push("\a");
            break;
          case "r":
            parts.push("\r");
            break;
          case "b":
            parts.push("\b");
            break;
          case "'":
            parts.push("'");
            break;
          case '"':
            parts.push('"');
            break;
          default:
            parts.push(char);
            break;
        }
        escaped = false;
      } else {
        switch (char) {
          case delimiter:
            return makeLiteral(
              browser,
              AstTypePrimitiveNative.String,
              parts.join(""),
            );
          case "\\":
            escaped = true;
            break;
          default:
            parts.push(char);
            break;
        }
      }
    }
  }
}

export function parseExpressionLiteral(
  browser: Browser,
): AstExpressionLiteral | TokenImpasse {
  const token = browser.peek();
  browser.increment();

  let value = token.str;

  if (value === "true") {
    return makeLiteral(browser, AstTypePrimitiveNative.Boolean, "true");
  }
  if (value === "false") {
    return makeLiteral(browser, AstTypePrimitiveNative.Boolean, "false");
  }
  if (value === "null") {
    return makeLiteral(browser, AstTypePrimitiveNative.Null, "null");
  }

  if (value.startsWith('"')) {
    return makeStringUntil(browser, '"');
  }
  if (value.startsWith("'")) {
    return makeStringUntil(browser, "'");
  }

  if (value.startsWith("0x")) {
    value = parseInt(value.slice(2), 16).toString(10);
  }
  if (value.startsWith("0b")) {
    value = parseInt(value.slice(2), 2).toString(10);
  }
  if (digits.has(value[0])) {
    return makeLiteral(browser, AstTypePrimitiveNative.Integer32, value);
  }

  return browser.impasse("Literal");
}
