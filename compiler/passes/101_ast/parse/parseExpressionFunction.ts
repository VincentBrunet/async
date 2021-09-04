import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseFunction } from "./parseFunction.ts";

export function parseExpressionFunction(
  browse: TokenBrowser,
): AstExpression | TokenImpasse {
  const astFunction = browse.recurse(parseFunction);
  if (astFunction instanceof TokenImpasse) {
    return astFunction;
  }
  return {
    type: AstExpressionType.Function,
    data: {
      function: astFunction,
    },
  };
}
