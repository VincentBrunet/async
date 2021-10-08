import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

const templateOpen = new Set(["<"]);
const templateClose = new Set([">"]);
const templateDelim = new Set([","]);

export function parseTypeIdentifier(
  browser: TokenBrowser,
): AstTypeIdentifier | TokenImpasse {
  // read native
  const name = browser.peek();
  if (name.kind !== TokenKind.Text) {
    return browser.impasse("TypeIdentifier.Name");
  }
  browser.consume();
  // param
  const params = browser.recurseArray(
    false,
    templateOpen,
    templateClose,
    templateDelim,
    parseType,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasse("TypeIdentifier.Template", [
      params,
    ]);
  }
  // done
  return {
    name: name.str,
    params: params,
  };
}
