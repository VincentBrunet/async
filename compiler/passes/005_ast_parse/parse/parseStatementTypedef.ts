import { Keyword } from "../../../constants/Keyword.ts";
import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

export function parseStatementTypedef(
  browser: TokenBrowser,
): AstStatementTypedef | TokenImpasse {
  // keyword
  const tokenKeyword = browser.peek();
  if (tokenKeyword.str !== Keyword.Typedef) {
    return browser.impasse("Typedef.keyword");
  }
  browser.consume();

  // name
  const tokenName = browser.peek();
  if (tokenName.kind !== TokenKind.Text) {
    return browser.impasse("Typedef.Name");
  }
  browser.consume();

  // equal
  const tokenEqual = browser.peek();
  if (tokenEqual.str !== "=") {
    return browser.impasse("Typedef.Equal");
  }
  browser.consume();

  // type
  const astType = browser.recurse(parseType);
  if (astType instanceof TokenImpasse) {
    return browser.impasse("Typedef.Expression", [astType]);
  }

  // Done
  return {
    name: tokenName.str,
    type: astType,
  };
}
