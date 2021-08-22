import { AstExpression, AstExpressionType } from "../data/AstExpression.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpressionMath } from "./parseExpressionMath.ts";
import { parseFunction } from "./parseFunction.ts";

export function parseExpressionFunction(
  browse: TokenBrowser,
): AstExpression | TokenImpasse {
  // function declaration
  const astFunction = browse.recurse(parseFunction);
  if (!(astFunction instanceof TokenImpasse)) {
    return {
      type: AstExpressionType.Function,
      value: {
        function: astFunction,
      },
    };
  }
  // next
  return browse.recurse(parseExpressionMath);
}
