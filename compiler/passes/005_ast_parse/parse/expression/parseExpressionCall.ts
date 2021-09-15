import { AstExpression } from "../../../../data/ast/expression/AstExpression.ts";
import { AstExpressionCall } from "../../../../data/ast/expression/AstExpressionCall.ts";
import { TokenBrowser } from "../../util/TokenBrowser.ts";
import { TokenImpasse } from "../../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseExpressionCall(
  browser: TokenBrowser,
  astCallee: AstExpression,
): AstExpressionCall | TokenImpasse {
  // param - open
  const delimParamOpen = browser.peek();
  if (delimParamOpen.str !== "(") {
    return browser.impasse("Call.Params");
  }
  browser.consume();
  // param - loop
  const astParams = new Array<AstExpression>();
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
      return browser.impasse("Call.Param", [
        astParam,
      ]);
    } else {
      astParams.push(astParam);
    }
    // params - separator, end
    const delimParamSep = browser.peek();
    if (delimParamSep.str === ",") {
      browser.consume();
    } else if (delimParamSep.str === ")") {
      browser.consume();
      break;
    } else {
      return browser.impasse("Call.Param(separator)");
    }
  }
  // done
  return {
    callee: astCallee,
    params: astParams,
  };
}
