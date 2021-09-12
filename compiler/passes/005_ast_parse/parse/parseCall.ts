import { AstCall } from "../../../data/ast/AstCall.ts";
import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

export function parseCall(
  browser: TokenBrowser,
  astCallee: AstExpression,
): AstCall | TokenImpasse {
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
