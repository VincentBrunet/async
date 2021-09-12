import { Keyword } from "../../../constants/Keyword.ts";
import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstType } from "../../../data/ast/AstType.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseType } from "./parseType.ts";

export function parseFunction(
  browser: TokenBrowser,
): AstFunction | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== Keyword.Function) {
    return browser.impasse("Function (fn)");
  }
  browser.consume();

  // return type (optional)
  const astReturn = browser.recurse(parseType);
  if (astReturn instanceof TokenImpasse) {
    return browser.impasse("Function.Type", [astReturn]);
  }

  // params
  const astParams = new Array<AstParam>();

  // params - open (optional)
  const paramOpen = browser.peek();
  if (paramOpen.str === "(") {
    browser.consume();

    while (true) {
      // params - close
      const paramClose = browser.peek();
      if (paramClose.str === ")") {
        browser.consume();
        break;
      }

      // params - optional name
      let name: string | undefined;
      const paramName = browser.peek();
      if (paramName.kind === TokenKind.Text) {
        browser.consume();
        name = paramName.str;
      }
      name = name ?? ("$" + astParams.length);

      // params - optional type
      let type: AstType;
      const paramType = browser.recurse(parseType);
      if (paramType instanceof TokenImpasse) {
        return browser.impasse("Function.Param(type)", [paramType]);
      }
      type = paramType;

      // param - validated
      astParams.push({
        name: name,
        type: type,
      });

      // params - separator, end
      const paramDelimSeparator = browser.peek();
      if (paramDelimSeparator.str === ",") {
        browser.consume();
      } else if (paramDelimSeparator.str === ")") {
        browser.consume();
        break;
      } else {
        return browser.impasse("Function.Param(separator)");
      }
    }
  }

  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Function.Block", [astBlock]);
  }

  // done, create ast
  return {
    params: astParams,
    return: astReturn,
    block: astBlock,
  };
}
