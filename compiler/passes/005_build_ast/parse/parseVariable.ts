import { Keyword } from "../../../constants/Keyword.ts";
import { TokenKind } from "../../../data/token/TokenKind.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseType } from "./parseType.ts";
import { AstType } from "../../../data/ast/AstType.ts";
import { AstExpression } from "../../../data/ast/AstExpression.ts";

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
  const delimType = browser.peek();
  if (delimType.str === ":") {
    browser.consume();
    const astType = browser.recurse(parseType);
    if (astType instanceof TokenImpasse) {
      return browser.impasse("Variable.Type", [astType]);
    }
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

  // Done
  return {
    mutable: mutable,
    name: name,
    type: type,
    value: value,
  };
}
