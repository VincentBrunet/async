import { Keyword } from "../../../constants/Keyword.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstFunction, AstFunctionParam } from "../data/AstFunction.ts";
import { AstType } from "../data/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseIdentifier } from "./parseIdentifier.ts";
import { parseType } from "./parseType.ts";

export function parseFunction(
  browser: TokenBrowser,
): AstFunction | TokenImpasse {
  const astFunction: AstFunction = {
    params: [],
  };

  // keyword (required)
  const first = browser.peek();
  if (first.str !== Keyword.Function) {
    return browser.impasse("Function (fn)");
  }
  browser.consume();

  // return type (optional)
  const delimType = browser.peek();
  if (delimType.str === ":") {
    browser.consume();
    const astReturn = browser.recurse(parseType);
    if (astReturn instanceof TokenImpasse) {
      return browser.impasse("Type", [astReturn]);
    }
    astFunction.return = astReturn;
  }

  // params - open (optional)
  const delimParamOpen = browser.peek();
  if (delimParamOpen.str === "(") {
    browser.consume();

    while (true) {
      // params - close
      const delimParamClose = browser.peek();
      if (delimParamClose.str === ")") {
        browser.consume();
        break;
      }

      // ast repr
      const astFunctionParam: AstFunctionParam = {};

      // params - optional name
      const astFunctionParamName = browser.recurse(parseIdentifier);
      if (!(astFunctionParamName instanceof TokenImpasse)) {
        astFunctionParam.name = astFunctionParamName;
      }

      // params - optional type
      const delimParamType = browser.peek();
      if (delimParamType.str === ":") {
        browser.consume();
        const astFunctionParamType = browser.recurse(parseType);
        if (!(astFunctionParamType instanceof TokenImpasse)) {
          astFunctionParam.type = astFunctionParamType;
        }
      }

      // param - validated
      astFunction.params.push(astFunctionParam);

      // params - separator, end
      const delimParamSep = browser.peek();
      if (delimParamSep.str === ",") {
        browser.consume();
      } else if (delimParamSep.str === ")") {
        browser.consume();
        break;
      } else {
        return browser.impasse("Function parameters separator");
      }
    }
  }

  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  if (!(astBlock instanceof TokenImpasse)) {
    astFunction.block = astBlock;
  }

  return astFunction;
}
