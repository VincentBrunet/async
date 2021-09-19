import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseExpressionObject(
  browser: TokenBrowser,
): AstExpressionObject | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "obj") {
    return browser.impasse("Object.Keyword");
  }
  browser.consume();
  // type annotation
  const astAnnotation = browser.recurse(parseAnnotation);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasse("Object.Annotation", [astAnnotation]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Object.Block", [astBlock]);
  }
  // done
  return {
    annotation: astAnnotation,
    block: astBlock,
  };
}
