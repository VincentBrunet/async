import { Keyword } from "../../../../constants/Keyword.ts";
import { AstExpressionObject } from "../../../../data/ast/expression/AstExpressionObject.ts";
import { TokenBrowser } from "../../util/TokenBrowser.ts";
import { TokenImpasse } from "../../util/TokenImpasse.ts";
import { parseAnnotation } from "../parseAnnotation.ts";
import { parseBlock } from "../parseBlock.ts";

export function parseExpressionObject(
  browser: TokenBrowser,
): AstExpressionObject | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Object) {
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
