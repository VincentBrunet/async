import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hash64 } from "../../../lib/core/strings/hash64.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseStatementVariable(
  browser: TokenBrowser,
): AstStatementVariable | TokenImpasse {
  // keyword const/mutable
  let mutable = false;
  const modifier = browser.peek();
  if (modifier.str === "const") {
    mutable = false;
  } else if (modifier.str === "mutable") {
    mutable = true;
  } else {
    return browser.impasse("Variable.modifier");
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
  const astAnnotation = browser.recurse(parseAnnotationType);
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
  const hash = hash64(name);

  // Done
  return {
    mutable: mutable,
    name: name,
    hash: hash,
    annotation: astAnnotation,
    value: value,
  };
}
