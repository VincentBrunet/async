import { AstAnnotation } from "../../../data/ast/AstAnnotation.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./type/parseType.ts";

export function parseAnnotation(
  browser: TokenBrowser,
): AstAnnotation | TokenImpasse {
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
