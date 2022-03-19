import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseExpressionRun(
  browser: Browser,
): AstExpressionRun | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "expr") {
    return browser.impasse("Run.Keyword");
  }
  browser.consume();
  // type annotation
  const astAnnotation = browser.recurse(parseAnnotationType);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasse("Run.Annotation", [astAnnotation]);
  }
  // block
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Run.Block", [astBlock]);
  }
  // done
  return {
    annotation: astAnnotation,
    block: astBlock,
  };
}
