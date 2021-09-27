import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
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
  browser: TokenBrowser,
  id: AstTypePrimitiveId,
  value: string,
): AstExpressionLiteral {
  browser.forward();
  return {
    id: id,
    value: value,
  };
}

function makeStringUntil(
  browser: TokenBrowser,
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
              AstTypePrimitiveId.String,
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
  browser: TokenBrowser,
): AstExpressionLiteral | TokenImpasse {
  const token = browser.peek();
  browser.increment();

  let value = token.str;

  if (value === "true") {
    return makeLiteral(browser, AstTypePrimitiveId.Boolean, "true");
  }
  if (value === "false") {
    return makeLiteral(browser, AstTypePrimitiveId.Boolean, "false");
  }
  if (value === "null") {
    return makeLiteral(browser, AstTypePrimitiveId.Null, "null");
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
    return makeLiteral(browser, AstTypePrimitiveId.Integer32, value);
  }

  return browser.impasse("Literal");
}
