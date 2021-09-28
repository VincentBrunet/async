import { AstExpressionImport } from "../../../data/ast/AstExpressionImport.ts";
import { AstTypePrimitiveId } from "../../../data/ast/AstTypePrimitive.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionLiteral } from "./parseExpressionLiteral.ts";

export function parseExpressionImport(
  browser: TokenBrowser,
): AstExpressionImport | TokenImpasse {
  // leyword
  const keyword = browser.peek();
  if (keyword.str !== "import") {
    return browser.impasse("ExpressionImport.Keyword");
  }
  browser.consume();

  // url
  const literal = browser.recurse(parseExpressionLiteral);
  if (literal instanceof TokenImpasse) {
    return browser.impasse("ExpressionImport.Url", [literal]);
  }
  if (literal.id !== AstTypePrimitiveId.String) {
    return browser.impasse("ExpressionImport.Url.String");
  }

  // Content
  return {
    url: literal.value,
  };
}
