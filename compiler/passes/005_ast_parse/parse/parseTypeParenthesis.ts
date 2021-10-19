import { AstTypeParenthesis } from "../../../data/ast/AstTypeParenthesis.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

const templateOpen = new Set(["<"]);
const templateClose = new Set([">"]);
const templateDelim = new Set([","]);

export function parseTypeParenthesis(
  browser: Browser,
): AstTypeParenthesis | TokenImpasse {
  // Open
  const open = browser.peek();
  if (open.str !== "(") {
    return browser.impasse("TypeParenthesis.Opening");
  }
  browser.consume();
  // Type
  const type = browser.recurse(parseType);
  if (type instanceof TokenImpasse) {
    return browser.impasse("TypeParenthesis.Type", [type]);
  }
  // Close
  const close = browser.peek();
  if (close.str !== ")") {
    return browser.impasse("TypeParenthesis.Closing");
  }
  browser.consume();
  // Done
  return {
    type: type,
  };
}
