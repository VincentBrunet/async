import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";
import { Keyword } from "../../../constants/Keyword.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { AstExpression } from "../../../data/ast/expression/AstExpression.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseVariable(
  browser: TokenBrowser,
): AstVariable | TokenImpasse {
  // keyword const/mutable
  let mutable = false;
  const tokenKeyword = browser.peek();
  if (tokenKeyword.str === Keyword.VariableConstant) {
    mutable = false;
  } else if (tokenKeyword.str === Keyword.VariableMutable) {
    mutable = true;
  } else {
    return browser.impasse("Variable.keyword");
  }
  browser.consume();

  // name
  const tokenName = browser.peek();
  if (tokenName.kind !== TokenKind.Text) {
    return browser.impasse("Variable.Name");
  }
  browser.consume();
  const name = tokenName.str;

  // type annotation
  const astAnnotation = browser.recurse(parseAnnotation);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasse("Variable.Annotation", [astAnnotation]);
  }

  // value (optional)
  let value: AstExpression | undefined;
  const tokenEqual = browser.peek();
  if (tokenEqual.str === "=") {
    browser.consume();
    const astValue = browser.recurse(parseExpression);
    if (astValue instanceof TokenImpasse) {
      return browser.impasse("Variable.Expression", [astValue]);
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
    annotation: astAnnotation,
    value: value,
  };
}
