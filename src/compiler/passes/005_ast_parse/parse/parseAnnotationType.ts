import { AstAnnotationType } from "../../../data/ast/AstAnnotationType.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

export function parseAnnotationType(
  browser: Browser,
): AstAnnotationType | TokenImpasse {
  // type annotation symbol
  const keyword = browser.peek();
  if (keyword.str !== ":") {
    return {};
  }
  browser.consume();
  // actual type content
  const type = browser.recurse(parseType);
  if (type instanceof TokenImpasse) {
    return browser.impasse("Annotation.Type", [type]);
  }
  // done
  return {
    type: type,
  };
}
