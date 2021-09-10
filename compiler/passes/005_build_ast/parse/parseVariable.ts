import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";
import { Keyword } from "../../../constants/Keyword.ts";
import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { AstType } from "../../../data/ast/AstType.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseType } from "./parseType.ts";

export function parseVariable(
  browser: TokenBrowser,
): AstVariable | TokenImpasse {
  // keyword const/mutable (required)
  let mutable = false;
  const first = browser.peek();
  if (first.str === Keyword.VariableConstant) {
    mutable = false;
  } else if (first.str === Keyword.VariableMutable) {
    mutable = true;
  } else {
    return browser.impasse("Variable declaration: " + first.str);
  }
  browser.consume();

  // name (required)
  const tokenName = browser.peek();
  if (tokenName.kind !== TokenKind.Text) {
    return browser.impasse("Variable.Name");
  }
  browser.consume();
  const name = tokenName.str;

  // type (optional)
  let type: AstType = {};
  const astType = browser.recurse(parseType);
  if (!(astType instanceof TokenImpasse)) {
    type = astType;
  }

  // value (optional)
  let value: AstExpression | undefined;
  const delimValue = browser.peek();
  if (delimValue.str === "=") {
    browser.consume();
    const astValue = browser.recurse(parseExpression);
    if (astValue instanceof TokenImpasse) {
      return browser.impasse("Variable's Expression", [astValue]);
    }
    value = astValue;
  }

  // hashed name
  const sha256 = createHash("sha256").update(name).toString();
  const hash = "0x" + sha256.slice(0, 16).toUpperCase();

  // Done
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    type: type,
    value: value,
  };
}
