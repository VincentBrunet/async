import { AstCall } from "../data/AstCall.ts";
import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseCall(
  browser: TokenBrowser,
): AstCall | TokenImpasse {
  // callee // TODO
  const astCallee = browser.recurse(parseExpression, AstExpressionType.Call);
  if (astCallee instanceof TokenImpasse) {
    return browser.impasse("Call.Callee", [astCallee]);
  }
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
  }
  // done
  return {
    callee: astCallee,
    params: astParams,
  };
}
