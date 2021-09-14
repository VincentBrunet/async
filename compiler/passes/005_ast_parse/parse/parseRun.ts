import { Keyword } from "../../../constants/Keyword.ts";
import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseRun(
  browser: TokenBrowser,
): AstExpressionRun | TokenImpasse {
  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Run) {
    return browser.impasse("Run.Keyword");
  }
  browser.consume();
  // type annotation
  const astAnnotation = browser.recurse(parseAnnotation);
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
