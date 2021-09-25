import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { TokenKind } from "../../../data/token/Token.ts";
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
  id: AstTypePrimitiveId,
  value: string,
): AstExpressionLiteral {
  return {
    id: id,
    value: value,
  };
}

export function parseExpressionLiteral(
  browser: TokenBrowser,
): AstExpressionLiteral | TokenImpasse {
  const token = browser.peek();

  if (token.kind !== TokenKind.Text) {
    return browser.impasse("Literal");
  }

  let value = token.str;

  if (value === "true") {
    browser.consume();
    return makeLiteral(AstTypePrimitiveId.Boolean, "true");
  }
  if (value === "false") {
    browser.consume();
    return makeLiteral(AstTypePrimitiveId.Boolean, "false");
  }
  if (value === "null") {
    browser.consume();
    return makeLiteral(AstTypePrimitiveId.Null, "null");
  }

  if (value.startsWith("0x")) {
    value = parseInt(value.slice(2), 16).toString(10);
  }
  if (value.startsWith("0b")) {
    value = parseInt(value.slice(2), 2).toString(10);
  }

  if (digits.has(value[0])) {
    browser.consume();
    return makeLiteral(AstTypePrimitiveId.Integer32, value);
  }

  return browser.impasse("Literal");
}
