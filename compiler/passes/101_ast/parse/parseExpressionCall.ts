import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseExpressionIdentifier } from "./parseExpressionIdentifier.ts";

export function parseExpressionCall(
  browser: TokenBrowser
): AstExpression | TokenImpasse {
  // callee
  const astCallee = browser.recurse(parseExpressionIdentifier);
  if (astCallee instanceof TokenImpasse) {
    return browser.impasse("Expression as function call callee", astCallee);
  }
  // param - open
  const delimParamOpen = browser.peek();
  if (delimParamOpen.str !== "(") {
    return astCallee;
  }
  browser.consume();
  // param - loop
  const astParams = [];
  while (true) {
    // param - close
    const delimParamClose = browser.peek();
    if (delimParamClose.str === ")") {
      browser.consume();
      break;
    }
    // param - content
    const astParam = browser.recurse(parseExpression);
    if (astParam instanceof TokenImpasse) {
      return browser.impasse("Expression as function call parameter", astParam);
    } else {
      astParams.push(astParam);
    }
  }
  // done
  return {
    type: AstExpressionType.Call,
    value: {
      callee: astCallee,
      params: astParams,
    },
  };
}
