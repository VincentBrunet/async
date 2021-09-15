import { Keyword } from "../../../constants/Keyword.ts";
import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { AstParam } from "../../../data/ast/AstParam.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseExpressionFunction(
  browser: TokenBrowser,
): AstExpressionFunction | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== Keyword.Function) {
    return browser.impasse("Function.Keyword");
  }
  browser.consume();

  // return type annotation
  const astReturn = browser.recurse(parseAnnotation);
  if (astReturn instanceof TokenImpasse) {
    return browser.impasse("Function.Return", [astReturn]);
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

      // params - type annotation
      const paramAnnotation = browser.recurse(parseAnnotation);
      if (paramAnnotation instanceof TokenImpasse) {
        return browser.impasse("Function.Param.Annotation", [paramAnnotation]);
      }

      // param - validated
      astParams.push({
        name: name,
        annotation: paramAnnotation,
      });

      // params - separator, end
      const paramDelimSeparator = browser.peek();
      if (paramDelimSeparator.str === ",") {
        browser.consume();
      } else if (paramDelimSeparator.str === ")") {
        browser.consume();
        break;
      } else {
        return browser.impasse("Function.Param.Separator");
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
