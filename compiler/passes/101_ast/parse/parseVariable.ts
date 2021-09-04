import { Keyword } from "../../../constants/Keyword.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstVariable } from "../data/AstVariable.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseType } from "./parseType.ts";

export function parseVariable(
  browser: TokenBrowser,
): AstVariable | TokenImpasse {
  const astVariable: AstVariable = {
    mutable: false,
    name: "????",
  };

  // keyword const/mutable (required)
  const first = browser.peek();
  if (first.str === Keyword.VariableConstant) {
    astVariable.mutable = false;
  } else if (first.str === Keyword.VariableMutable) {
    astVariable.mutable = true;
  } else {
    return browser.impasse("Variable declaration: " + first.str);
  }
  browser.consume();

  // name (required)
  const name = browser.peek();
  if (name.type !== TokenType.Text) {
    return browser.impasse("Variable.Name");
  }
  astVariable.name = name.str;
  browser.consume();

  // type (optional)
  const delimType = browser.peek();
  if (delimType.str === ":") {
    browser.consume();
    const astType = browser.recurse(parseType);
    if (astType instanceof TokenImpasse) {
      return browser.impasse("Variable.Type", [astType]);
    }
    astVariable.type = astType;
  }

  // value (optional)
  const delimValue = browser.peek();
  if (delimValue.str === "=") {
    browser.consume();
    const astValue = browser.recurse(parseExpression);
    if (astValue instanceof TokenImpasse) {
      return browser.impasse("Variable's Expression", [astValue]);
    }
    astVariable.value = astValue;
  }

  return astVariable;
}
