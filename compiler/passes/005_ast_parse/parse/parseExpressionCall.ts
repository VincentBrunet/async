import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

const paramOpen = new Set(["("]);
const paramClose = new Set([")"]);
const paramDelim = new Set([","]);

export function parseExpressionCall(
  browser: TokenBrowser,
  astCallee: AstExpression,
): AstExpressionCall | TokenImpasse {
  // params
  const params = browser.recurseArray(
    true,
    paramOpen,
    paramClose,
    paramDelim,
    parseExpression,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasse("ExpressionCall.Params", [params]);
  }
  // done
  return {
    callee: astCallee,
    params: params,
  };
}
