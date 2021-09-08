import { Keyword } from "../../../constants/Keyword.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseType } from "./parseType.ts";
import { AstType } from "../../../data/ast/AstType.ts";

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
      return browser.impasse("Function.Type", [astReturn]);
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

      // params - optional name
      let name: string | undefined;
      const identifierParamName = browser.peek();
      if (identifierParamName.kind === TokenKind.Text) {
        browser.consume();
        name = identifierParamName.str;
      }

      // params - optional type
      let type: AstType = {};
      const delimParamType = browser.peek();
      if (delimParamType.str === ":") {
        browser.consume();
        const AstParamType = browser.recurse(parseType);
        if (AstParamType instanceof TokenImpasse) {
          return browser.impasse("Function.Param(type)", [
            AstParamType,
          ]);
        }
        type = AstParamType;
      }

      // param - validated
      astFunction.params.push({
        name: name ?? ("$" + astFunction.params.length),
        type: type,
      });

      // params - separator, end
      const delimParamSep = browser.peek();
      if (delimParamSep.str === ",") {
        browser.consume();
      } else if (delimParamSep.str === ")") {
        browser.consume();
        break;
      } else {
        return browser.impasse("Function.Param(separator)");
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
