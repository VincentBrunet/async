import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

const forbidden = new Set<string>();
forbidden.add("return");
forbidden.add("if");
forbidden.add("else");
forbidden.add("fn");
forbidden.add("unsafe");
forbidden.add("typedef");
forbidden.add("const");
forbidden.add("mutable");
forbidden.add("import");
forbidden.add("from");

export function parseExpressionIdentifier(
  browser: TokenBrowser,
): AstExpressionIdentifier | TokenImpasse {
  // Read text
  const token = browser.peek();
  if (token.kind !== TokenKind.Text) {
    return browser.impasse("ExpressionIdentifier.Text");
  }
  browser.consume();
  // Check if reserved keyword
  if (forbidden.has(token.str)) {
    return browser.impasse("ExpressionIdentifier.Forbidden");
  }
  // done
  return {
    name: token.str,
  };
}
